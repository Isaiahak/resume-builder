import AddAts from "./AddAts";
import AddBulletPoint from "./AddBulletPoint";
import AddProject from "./AddProject";
import { useState } from "react";

export default function AddPage(){

	const options = ["ats","bulletpoint","project"]
	type addOption = "ats" | "bulletpoint" | "project"
	const [selected, setSelected ] = useState<option>("ats")

	function AddSelector(){
		return(
		<div className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.08] rounded-sm p-1">
		  {options.map((option) => (
			<button
			  key={option}
			  onClick={() => setSelected(option)}
			  className={`flex-1 px-4 py-2 rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-200
				${selected === option
				  ? "bg-white/[0.08] text-white border border-white/[0.15]"
				  : "text-white/30 hover:text-white/60 border border-transparent"
				}`}
			>
			  {option}
			</button>
		  ))}
		</div>
		)
	}

	return(
	<div>
		<AddSelector/>
		{selected === "ats" ? (
			<AddAts/>
		) : selected === "bulletpoint" ? (
			<AddBulletPoint/>
		) :(
			<AddProject/>
		)}
	</div>
	)
}

