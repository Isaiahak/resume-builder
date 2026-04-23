import { useState }from "react";
import Notification from "../misc/notification";
import type { Keyword, BulletpointResult, BulletPointPrompt } from "../../shared/types/types";

export default function AddBulletPoint(){
	const [bulletPoint, setBulletPoint] = useState<string>("");	
	const [isSaving, setIsSaving] = useState<bool>(false);	
	const [notification, setNotification] = useState<{text:string, type:boolean, id: number}>({
		text: "",
		type: false,
		id: Date.now()
	})

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
				setNotification({
					text:"Failed to connect to server",
					type:false,
					id: Date.now()
				})
				setIsSaving(false);
			} else {
				const result: BulletpointResult = res.json()
				if (result.exists) {
					setNotification({
						text:"db already contains bulletpoint",
						type:false,
						id: Date.now()
					})
					setBulletPoint("");
				} else if (result.added === true) {
					setNotification({
						text: "successfully added bulletpoint",
						type: true,
						id: Date.now()
					})
					setBulletPoint("");
				} else {
					setNotification({
						text:"failed to add bulletpoint",
						type:false,
						id: Date.now()
					})
				}
				setIsSaving(false);
			}
		} catch(err){
			setNotification({
				text:"Invalid JSON: ",
				type:false,
				id: Date.now()
			})
		}
	};

return(	
	<div>
	<Notification notification={notification} /> 
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
