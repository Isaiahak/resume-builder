import { useState } from "react";
import BulletPointList from "./BulletPoint";
import BulletPointButton from "./BulletPointButton";
import AtsButton from "./AtsButton";
import type { BulletPointsResult } from "@shared/types/types";
import Notification from "../misc/notification";

export default function SearchPage(){
	const [query, setQuery] = useState<string>("");
	const [focused, setFocused] = useState<boolean>(false);
	const [results, setResults] = useState<BulletPointsResult>({
	  exists: false,
	  bulletPoints: [],
	});
	const [notification, setNotification] = useState<{text:string, type:boolean, id: number}>({
		text: "",
		type:false,
		id: Date.now()
	})

	const [hasSearched, setHasSearched] = useState<boolean>(false);

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		if (!query.trim()) return;
			
		const res = await fetch("http://localhost:3000/check-ats?ats="+query);

		if (!res.ok) {
			console.log("failed to send request");
			setNotification({
				text: "failed to send request",
				type: false,
				id: Date.now()
			})
		}

		const data = await res.json();
		setResults(data);
		setHasSearched(true);
	};

	const handleClear = (): void => {
		setQuery("");
		setResults({
		exists: false,
		bulletPoints: [],
	});

		setHasSearched(false);
	};

	return(
		<div>
		{/* Search Bar */}
		<form onSubmit={handleSearch} className="w-full">
			<div
			className={`relative flex items-center border rounded-sm bg-white/[0.02] transition-all duration-300 ${
			focused
			? "border-white/50 shadow-[0_0_24px_rgba(255,255,255,0.04)]"
			: "border-white/15"
			}`}
			>
				{/* Search Icon */}
				<svg
				className={`absolute left-4 w-4 h-4 transition-opacity duration-300 ${focused ? "opacity-60" : "opacity-25"}`}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				>
					<circle cx="11" cy="11" r="7" />
					<line x1="16.5" y1="16.5" x2="22" y2="22" />
				</svg>
				<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				placeholder="Enter ATS keyword."
				className="w-full bg-transparent outline-none border-none text-white placeholder-white/25 text-sm py-4 pl-12 pr-12 font-mono tracking-wide"
				/>

				{/* Clear */}
				{query && (
				<button
				type="button"
				onClick={handleClear}
				className="absolute right-10 text-white/30 hover:text-white/70 text-xl leading-none bg-transparent border-none cursor-pointer transition-colors duration-200"
				>
				×
				</button>
				)}

				{/* Submit */}
				<button
				type="submit"
				className={`absolute right-4 bg-transparent border-none transition-opacity duration-200 ${
				query.trim() ? "opacity-100 cursor-pointer" : "opacity-20 cursor-default"
				}`}
				>
					<svg
					className="w-4 h-4 text-white"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					>
						<line x1="5" y1="12" x2="19" y2="12" />
						<polyline points="13 6 19 12 13 18" />
					</svg>
				</button>
			</div>
		</form>

		{/* ── results section ── */}
		{hasSearched && results &&(
		<div className="w-full max-w-2xl mt-12">
			{!results.exists ? (
			<AtsButton query={query}/>
			) : results.bulletPoints.length === 0 ? (
			<BulletPointButton query={query}/>
			) : (
			<BulletPointList bullets={results.bulletPoints} />
			)}
		</div>
		)}
	</div>
	)
};
