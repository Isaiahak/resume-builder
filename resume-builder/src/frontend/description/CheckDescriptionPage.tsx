import { useState } from "react";
import Notification from "../misc/notification";

export default function CheckDescriptionPage(){

	const [description, setDescription ] = useState<string>("");
	const [isSubmitting, setIsSubmitting ] = useState<boolean>(false);
	const [notification, setNotification ] = useState<{text:string, type:boolean, id:number}>({
		text: "",
		type: false,
		id: Date.now()
	})
	
	const handleSubmit = async () => {
		setIsSubmitting(true);
		const res = await fetch("http://localhost:3000/check-description", {
			method: "POST",
			header: {"Content-Type":"application/json"},
			body: JSON.stringify(description)
		})
		if (res.ok) {
			setNotification({
				text: "successfully checked description",
				type: true,
				id:Date.now(),
			})
		} else {
			setNotification({
				text: "failed to check description",
				type: false,
				id:Date.now(),
			})
		}
		setIsSubmitting(false);
	}

	return(
		<div>
		<Notification notification={notification}/>
		<textarea
			value={description}
			onChange={(e) => setDescription(e.target.value)}
			rows={7}
			className="w-full resize-y bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3.5 font-mono text-xs leading-relaxed text-white/85 placeholder-white/20 outline-none focus:border-white/25 focus:bg-white/[0.04] transition-all duration-200"
		  />
		  <button
			onClick={() => handleSubmit}
			className={`w-full flex items-center justify-center border rounded-sm px-5 py-4 transition-all duration-200 cursor-pointer group
			  ${isSubmitting
				? "border-white/30 bg-white/[0.06] text-white/60"
				: "border-white/[0.08] bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05] text-white/50 hover:text-white/80"
			  }
			  disabled:opacity-20 disabled:cursor-default`}
		  >
			<span className={`text-xs tracking-widest uppercase transition-colors duration-200 shrink-0 ${
			  isSubmitting ? "text-white/50" : "text-white/15 group-hover:text-white/40"
			}`}>
			  {isSubmitting ? "Saving..." : "Submit"}
			</span>
		  </button>
	</div>
	)
};
