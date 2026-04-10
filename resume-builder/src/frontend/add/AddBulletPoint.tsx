import { useState }from "react";
import type { Keyword, AddBulletpointResult, BulletPointPrompt } from "../../shared/types";

export default function AddBulletPoint(){
	const [bulletPoint, setBulletPoint] = useState<string>("");	
	const [isSaving, setIsSaving] = useState<bool>(false);	

	const handleAdd = async (e: React.FormEvent<HTMLFormEvent>): Promise<void> => {
		try {
			setIsSaving(true);
			const data: BulletPointPrompt = JSON.parse(bulletPoint);
			console.log(data);
			const res = await fetch("http://localhost:3000/add-bulletpoint",{
				method: "POST",
				header: {"Content-Type":"application/json"},
				body: JSON.stringify(data)
			});
			if (!res.ok) {
				console.log("Failed to connect to server");	
				setIsSaving(false);
			} else {
				const result: AddBulletpointResult = res.json()
				if (result.exists) {
					console.log("db already contains bulletpoint");
					setBulletPoint("");
				} else if (result.added === true) {
					console.log("successfully added bulletpoint");
					setBulletPoint("");
				} else {
					console.log("failed to add bulletpoint");
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
		value={bulletPoint}
		onChange={(e) => setBulletPoint(e.target.value)}
		rows={7}
		className="w-full resize-y bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3.5 font-mono text-xs leading-relaxed text-white/85 placeholder-white/20 outline-none focus:border-white/25 focus:bg-white/[0.04] transition-all duration-200"
	  />
	  <button
		onClick={() => handleAdd}
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
