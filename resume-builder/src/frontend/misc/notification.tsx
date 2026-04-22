import { useState, useEffect } from "react";

type Props = {
	notification: {
	text: string
	type: boolean
	id: number
	}
}

export default function Notification({notification}: Props) {
	const [isShowing, setIsShowing ] = useState<boolean>(false);

	useEffect(() => {
		if (notification.text != "") {
			setIsShowing(true);
			const timer = setTimeout(() => setIsShowing(false), 1500);
			return () => clearTimeout(timer)
		}
	},[notification]);

	const accent = notification.type === true ? "border-white/30 text-white/70" :
		notification.type === false ? "border-red-500/30 text-red-400/70" :
		"border-white/15 text-white/40";

	return(
		<div className={`fixed top-1/2 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 ${isShowing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
			<div className={`border rounded-sm bg-black/[0.9] px-16 py-6 font-mono text-xs tracking-widest uppercase transition-all duration-300 ${accent}`}>
				{notification.text}
			</div>
		</div> 
	)
}
