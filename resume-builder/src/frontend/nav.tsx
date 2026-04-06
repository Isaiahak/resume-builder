import { useContext } from "react";
import { PageContext } from "./context/pageContext";

export default function Nav(){
	const context = useContext(PageContext);

	if (!context) throw new Error("Must be used inside PageProvider");

	const { setSelectedPage } = context;

	return (
		<nav className="w-full border-b border-white/10 bg-black px-6 py-4 font-mono">
		  <div className="flex justify-center items-center gap-1">
			<button className="mx-auto py-2 hover:underline" 
					onClick={() => setSelectedPage("project")}>
			  Project
			</button>
			<button className="mx-auto py-2 hover:underline"
					onClick={() => setSelectedPage("search")}>
			  Search
			</button>
			<button className="mx-auto py-2 hover:underline"
					onClick={() => setSelectedPage("add")}>
				Add
			</button>
		  </div>
		</nav>
  );
};
