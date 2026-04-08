import { useContext } from "react";
import { PageContext } from "./context/pageContext";
import Nav from "./nav";
import SearchPage from "./search/SearchPage";
import ProjectViewPage from "./project/ProjectViewPage";
import AddPage from "./add/AddPage";

export default function HomePage() {
	const context = useContext(PageContext);

	if (!context) throw new Error("Must be used inside PageProvider");

	const { selectedPage } = context;

    return (
	<div className="min-h-screen bg-black text-white flex flex-col items-center px-6 font-mono">
		<Nav/>
		{/* ── Hero + Search ── */}
		<div className="w-full mt-10 pb-20 max-w-2xl flex flex-col items-center">
		{/* Headline */}
			<h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white text-center mb-3">
			Resume Builder
			</h1>
			{ selectedPage === "search" ? (
			<SearchPage/>
			) : selectedPage === "project" ? (
			<ProjectViewPage/>
			) : (
			<AddPage/>
			)}
		</div>
	</div>
	)
}

