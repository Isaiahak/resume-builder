import { useState } from "react";
import type { Project } from "../../shared/types";
import { ProjectType } from "../../shared/types";

export default function AddProject(){
	const [project, setProject ] = useState<Project>({
		name: "",
		description: "",
		duration: undefined,
		type:  ProjectType.PROJECT,
		categories: [], 
		keywords: [],
		bullets: [],
	});
		


	// per category on this page we show a list of keywords that can be attached to the project
	const handleClick = (): void =>{
		
	};


	return(
		<div>
			<form>

				<button
				onClick={handleClick}
				>
				</button>
			</form>
		</div>
	)
}
