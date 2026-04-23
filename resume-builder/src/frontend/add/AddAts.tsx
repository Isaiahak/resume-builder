import { useState }from "react";
import Notification from "../misc/notification";
import type { Keyword, AtsResult } from "@shared/types/types";

export default function AddAts(){
	const [ats, setAts] = useState<string>("");	
	const [isSaving, setIsSaving] = useState<bool>(false);
	const [notification, setNotification] = useState<{text: string; type: string; id: number}>({
		text: "",
		type: false,
		id: Date.now()
	});

	const handleAdd = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		try {
			setIsSaving(true);
			const data: Keyword[] = JSON.parse(ats);
			const res = await fetch("http://localhost:3000/add-ats",{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body: JSON.stringify(data)
			});
			if (!res.ok) {
				setNotification({
					text:"Failed to connect to server",
					type:false,
					id: Date.now(),
				});
				setIsSaving(false);
			} else {
				const result: AtsResult = await res.json();
				if (result.exists) {
					setNotification({
						text:"db already contains the keyword",
						type:false,
						id: Date.now()
					})
					setAts("");
				}
				if (result.added === true) {
					setNotification({
						text:"successfully added keyword",
						type:true,
						id: Date.now()
					})
					setAts("");
				} else {
					setNotification({
						text:"failed to add keyword",
						type:false,
						id:Date.now()
					})
				}
				setIsSaving(false);
			}
		} catch(err){
			setNotification({
				text:"Invalid JSON",
				type:false,
				id: Date.now()
			})
		}
	};
	
	return(
	<div>
	<Notification notification={notification} />
	  <textarea
		value={ats}
		onChange={(e) => setAts(e.target.value)}
		rows={7}
		className="w-full resize-y bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3.5 font-mono text-xs leading-relaxed text-white/85 placeholder-white/20 outline-none focus:border-white/25 focus:bg-white/[0.04] transition-all duration-200 z-0"
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
