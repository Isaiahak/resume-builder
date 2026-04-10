import { useState, useEffect } from "react";
import type { Project } from "../../shared/types";

interface BulletPointButtonProps {
  query: string;
}

function buildBulletPointPrompt(query: string): string {
	return `
	After doing research on the 2026 software developer market, I need you to create json representation of this bulletpoint model for the keyword: ${query}.
	model BulletPointPrompt {
	  id      Int    @id @default(autoincrement())
	  content String

	  projectId    Int
	  projectType  ProjectType
	  project      Project         @relation(fields: [projectId], references: [id]) // or relation if you expand later
	  job          String?
	  category     String
	  skillType    String
	  keywordLinks Keyword[]
	}
	content describes a task that most likely was done with the provided project using the provided keyword. make this a brief but informative bulletpoint describing a task done in the project, using keyword which achieve some metric of improvement most relevant to the project and keyword.

	project being the project the bulletpoint is for, with the project being,
	${project}
	
	catergory is the best fitting category out of this enum,
	enum Category {
	  FRONTEND
	  BACKEND
	  DEVOPS
	  DATA
	  ML
	  MANAGEMENT
	  DESIGN
	  TESTING
	  OTHER
	}

	skill Type describes the type of skill the bulletpoint describes should also be related to the ats keyword provided,
	enum SkillType {
	  HARD
	  SOFT
	}	
	
	keywordLinks are other keywords that might be associated with the bulletpoint, you can take these from the list contained within the project. Normalize the name to a standard industry format (Title Case, expand common abbreviations like JS → JavaScript, keep widely accepted acronyms like HTML unchanged)
	
	return only valid JSON. No explanations.	
  `;
}

export default function BulletPointButton({ query }: BulletPointButtonProps) {
	const [copied, setCopied] = useState<boolean>(false);
	const [projects, setProjects] = useState<Project[]>([]);
	const [projectSelected, setProjectSelected] = useState<boolean>(false);
	const [project, setProject] = useState<Project>({
		id: -1,
		name: "",
		description: "",
		duration: undefined,
		type: undefined,
		categories: [],
		keyword: [],
		bullets: []
	});
  
	useEffect(() => {
		const getProjects = async (): void =>{
			const res = await fetch("http://localhost:3000/get-projects")
			if (!res.ok){
				console.log("failed to recieve projects");
			} else {
				const data: Project[] = await res.json()
				if (data.length === 0){
					console.log("should create a project first!");
				} else {
					setProjects(data)	
				}

			}
		};

		getProjects();
	},[]);

	const handleCopy = (): void => {
		const prompt = buildBulletPointPrompt(query);
		navigator.clipboard.writeText(prompt);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	const handleClick = (proj: Project): void => {
		setProject(proj);
		setProjectSelected(true);
	};

	function ProjectSelectorButtons(){
		return(
			<div className="flex flex-col gap-4">
			{projects.map((project) => (
				<button
				onClick={() => handleClick(project)}
				className="w-full flex items-center justify-between border rounded-sm px-5 py-4 transition-all duration-200 cursor-pointer group"
				>
				<div className="flex items-center gap-3">
					<div className="text-left">
						<p className="text-white text-xs font-semibold tracking-widest uppercase">
						Bulletpoint Prompt
						</p>
					</div>
				</div>
				</button>	
			))}
			</div>
		)		
	}

  return (
	<div>
	{!projectSelected ? ( 
		<ProjectSelectorButtons/>
	) : (
		<button
		  onClick={handleCopy}
		  disabled={!query.trim()}
		  className={`w-full flex items-center justify-between border rounded-sm px-5 py-4 transition-all duration-200 cursor-pointer group
			${copied
			  ? "border-white/30 bg-white/[0.06] text-white/60"
			  : "border-white/[0.08] bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05] text-white/50 hover:text-white/80"
			}
			disabled:opacity-20 disabled:cursor-default`}
		>
		  <div className="flex items-center gap-3">
			<div className="text-left">
			  <p className="text-white text-xs font-semibold tracking-widest uppercase">
				Bulletpoint Prompt
			  </p>
			</div>
		  </div>

		  <span className={`text-xs tracking-widest uppercase transition-colors duration-200 shrink-0 ${
			copied ? "text-white/50" : "text-white/15 group-hover:text-white/40"
		  }`}>
			{copied ? "Copied!" : "Copy"}
		  </span>
		</button>
	)}
	</div>
  );
}
