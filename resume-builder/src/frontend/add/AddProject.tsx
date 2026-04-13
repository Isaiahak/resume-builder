import { useState, useEffect } from "react";
import type { Project, Keyword, AddProjectResult } from "../../shared/types";
import { Category, ProjectType } from "../../shared/enums";

export default function AddProject() {
	const [categoryKeywords, setCategoryKeywords] = useState<Map<Category, Keyword[]>>();
	const [selectedKeywords, setSelectedKeywords] = useState<Set<Keyword>>(new Set());
	const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(new Set());
	const [project, setProject] = useState<Project>({
		name: "",
		description: "",
		duration: undefined,
		type: ProjectType.PROJECT,
		categories: [],
		keywords: [],
		bullets: [],
	});

	useEffect(() => {
		const getKeywordsForCategories = async (): Promise<void> => {
			const res = await fetch("http://localhost:3000/get-category-keywords");
			if (!res.ok) {
			} else {
				const data: Map<Category, Keyword[]> = await res.json();
				setCategoryKeywords(data);
			}
		};
		getKeywordsForCategories();
	}, []);

	function handleKeywordClick(keyword: string) {
		const next = new Set(selectedKeywords);
		if (next.has(keyword)) {
			next.delete(keyword);
		} else {
			next.add(keyword);
		}
		setSelectedKeywords(next);
	}

	function handleCategoryClick(category: Category) {
		const next = new Set(selectedCategories);
		if (next.has(category)) {
			next.delete(category);
		} else {
			next.add(category);
		}
		setSelectedCategories(next);
	}

	const CategorySection = () => {
		const categories = Object.values(Category);
		return (
			<div className="flex flex-col gap-3">
				<span className="text-xs tracking-widest uppercase text-white/30 font-mono">
					Select Categories
				</span>
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => {
						const isSelected = selectedCategories.has(category);
						return (
							<button
								key={category}
								type="button"
								onClick={() => handleCategoryClick(category)}
								className={`px-3 py-1.5 rounded-sm border font-mono text-xs tracking-wide transition-all duration-200 cursor-pointer
									${isSelected
										? "border-white/50 bg-white/[0.08] text-white/80"
										: "border-white/[0.08] bg-white/[0.02] text-white/35 hover:border-white/25 hover:text-white/60 hover:bg-white/[0.04]"
									}`}
							>
								{category}
							</button>
						);
					})}
				</div>
			</div>
		);
	};

	const CategoryKeywordsSection = () => {
		if (!categoryKeywords || selectedCategories.size === 0) return null;

		const keywords: Keyword[] = [];
		selectedCategories.forEach((category) => {
			const kws = categoryKeywords[category];
			if (kws) keywords.push(...kws);
		});

		if (keywords.length === 0) return null;

		return (
			<div className="flex flex-col gap-3">
				<span className="text-xs tracking-widest uppercase text-white/30 font-mono">
					Select Keywords
				</span>
				<div className="flex flex-wrap gap-2">
					{keywords.map((keyword) => {
						const isSelected = selectedKeywords.has(keyword);
						return (
							<button
								key={keyword.name}
								type="button"
								onClick={() => handleKeywordClick(keyword)}
								className={`px-3 py-1.5 rounded-sm border font-mono text-xs tracking-wide transition-all duration-200 cursor-pointer
									${isSelected
										? "border-white/50 bg-white/[0.08] text-white/80"
										: "border-white/[0.08] bg-white/[0.02] text-white/35 hover:border-white/25 hover:text-white/60 hover:bg-white/[0.04]"
									}`}
							>
								{keyword.name}
							</button>
						);
					})}
				</div>
			</div>
		);
	};

	const handleClick = async (): void => {
		// sets categories
		setProject({ ...project, categories: selectedCategories.values()});
		setProject({ ...project, keywords: selectedKeywords.values()});
		
		const res = await fetch("localhost:5173/add-project",{
			method: "POST",
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify(project)
		});
		if (!res.ok){
			console.log("Failed to connect to server");
		} else {
			const result: AddProjectResult = await res.json();
			if (result.exists) {
				console.log("Project already exists!");
			} else if (res.added){
				console.log("successfully add project");
			} else {
				console.log("something went wrong");
			}
		}
	}

	return (
		<div className="w-full">
			<form className="flex flex-col gap-8">

				<div className="flex flex-col gap-2">
					<span className="text-xs tracking-widest uppercase text-white/30 font-mono">
						Project Name
					</span>
					<input
						type="text"
						value={project.name}
						onChange={(e) => setProject({ ...project, name: e.target.value })}
						placeholder="Enter project name."
						className="w-full bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3.5 font-mono text-sm text-white/85 placeholder-white/20 outline-none focus:border-white/25 focus:bg-white/[0.04] transition-all duration-200"
					/>
				</div>

				<div className="flex flex-col gap-3">
					<span className="text-xs tracking-widest uppercase text-white/30 font-mono">
						Project Type
					</span>
					<div className="flex gap-2">
						{[ProjectType.JOB, ProjectType.PROJECT].map((type) => {
							const isSelected = project.type === type;
							return (
								<button
									key={type}
									type="button"
									onClick={() => setProject({ ...project, type })}
									className={`px-5 py-2.5 rounded-sm border font-mono text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer
										${isSelected
											? "border-white/50 bg-white/[0.08] text-white/80"
											: "border-white/[0.08] bg-white/[0.02] text-white/35 hover:border-white/25 hover:text-white/60 hover:bg-white/[0.04]"
										}`}
								>
									{type === ProjectType.JOB ? "Job" : "Project"}
								</button>
							);
						})}
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<span className="text-xs tracking-widest uppercase text-white/30 font-mono">
						Description
					</span>
					<textarea
						value={project.description}
						onChange={(e) => setProject({ ...project, description: e.target.value })}
						rows={5}
						placeholder="Enter project description."
						className="w-full resize-y bg-white/[0.02] border border-white/[0.08] rounded-sm px-4 py-3.5 font-mono text-sm leading-relaxed text-white/85 placeholder-white/20 outline-none focus:border-white/25 focus:bg-white/[0.04] transition-all duration-200"
					/>
				</div>

				<div className="border-t border-white/[0.06]" />

				<CategorySection />

				<CategoryKeywordsSection />

				<button
					type="button"
					onClick={handleClick}
					className="w-40 flex self-center items-center justify-center border border-white/[0.08] bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05] rounded-sm px-5 py-4 transition-all duration-200 cursor-pointer group"
				>
					<span className="text-xs tracking-widest uppercase text-white/15 group-hover:text-white/40 transition-colors duration-200 font-mono">
						Submit
					</span>
				</button>
			</form>
		</div>
	);
}
