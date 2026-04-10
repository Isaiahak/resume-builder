import { useState }from "react";
import type { Keyword, AddAtsResult } from "../../shared/types";

export default function AddAts(){
	const [ats, setAts] = useState<string>("");	
	const [isSaving, setIsSaving] = useState<bool>(false);

	const handleAdd = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		try {
			setIsSaving(true);
			const data: Keyword = JSON.parse(ats);
			const res = await fetch("http://localhost:3000/add-ats",{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body: JSON.stringify(data)
			});
			if (!res.ok) {
				console.log("Failed to connect to server");	
				setIsSaving(false);
			} else {
				const result: AddAtsResult = await res.json()
				if (result.exists) {
					console.log("db already contains the keyword");
					// some type of error module
					setAts("");
				}
				if (result.added === true) {
					console.log("successfully added keyword");
					// some type of module for success
					setAts("");
				} else {
					// some type of module for failure
					console.log("failed to add keyword");
				}
				setIsSaving(false);
			}
		} catch(err){
			console.log("Invalid JSON: ", err);
		}
	};
	
	return(
	<div>
	  <textarea
		value={ats}
		onChange={(e) => setAts(e.target.value)}
		rows={7}
		className="w-full resize-y bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3.5 font-mono text-xs leading-relaxed text-white/85 placeholder-white/20 outline-none focus:border-white/25 focus:bg-white/[0.04] transition-all duration-200"
	  />
	  <button
		onClick={() => handleAdd()}
		className={`w-full flex items-center justify-center border rounded-sm px-5 py-4 transition-all duration-200 cursor-pointer group
		  ${isSaving
			? "border-white/30 bg-white/[0.06] text-white/60"
			: "border-white/[0.08] bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05] text-white/50 hover:text-white/80"
		  }
		  disabled:opacity-20 disabled:cursor-default`}
	  >
		<span className={`text-xs tracking-widest uppercase transition-colors duration-200 shrink-0 ${
		  isSaving ? "text-white/50" : "text-white/15 group-hover:text-white/40"
		}`}>
		  {isSaving ? "Saving..." : "Submit"}
		</span>
	  </button>
	</div>
	)
}
