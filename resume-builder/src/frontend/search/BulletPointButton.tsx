import { useState, useEffect } from "react";
import type { Project } from "@shared/types/types";
import { buildBulletPointPrompt } from "@shared/prompts/prompts";
interface BulletPointButtonProps {
  query: string;
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
