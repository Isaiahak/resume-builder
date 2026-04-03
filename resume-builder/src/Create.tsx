import { useState } from "react";

// pass the work ATS word or the target job as a parameter,
//
// in the case of the ats we generate a prompt i cna use to have chat create a seed for the database sugin the ats
//
// in the case of the bulletpoint we also need the ats we are targeting, the job we are targeting and the type of skills the ats is considered
//
export default function Create(){
	const [prompt, setPrompt] = useState("");
	const [focused, setFocused] = useState(false);

	return(
		<div className="">
			<p className="">
				Creeate Prompted for 	
			</p>
		</div>
	)
}
