import ProjectInfo from "./ProjectInfo";
import ProjectButton from "./ProjectButton";
import ProjectBulletPoints from "./ProjectBulletPoints";
import { ProjectProvider } from "../context/projectProvider";
import { useEffect, useState } from "react";
import type { Project } from "../../shared/types";

export default function ProjectViewPage(){
		
	const [projects, setProjects] = useState<Project[]>([]);

	const [project, setProject] = useState<Project | null>(null);

	useEffect(() => {
		async function getProjects() {
			const res = await fetch("http://localhost:3000/projects")
			if (!res.ok) {
				console.log("couldn't get projects")
			}
			const data: Project[] =  await res.json(); 
			setProjects(data); 
		}
		getProjects();
	},[]);

	// need a project context for this component
	return(
	<div>
		<ProjectProvider>
			{projects.length === 0 ? (
			<div>
				Add a project!
			</div>
			) : (
				<div>
				<ProjectInfo/>
				<ProjectBulletPoints/>	
				</div>
			)}
		</ProjectProvider>
	</div>
	);
}
