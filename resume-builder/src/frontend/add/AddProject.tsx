import { useState, useEffect } from "react";
import type { Project, Keyword } from "../../shared/types";
import { ProjectType } from "../../shared/types";

export default function AddProject(){
	const [categoryKeywords, setCategoryKeywords ] = useState<Map<Category,Keyword[]>>();
	const [selectedCategory, setSelectedCategory ] = useState<Category>(Category.FRONTEND);
	const [project, setProject ] = useState<Project>({
		name: "",
		description: "",
		duration: undefined,
		type:  ProjectType.PROJECT,
		categories: [], 
		keywords: [],
		bullets: [],
	});

	useEffect(() => {
		const getKeywordsForCategories = async (): void => {
			const res  = await fetch("http://localhost:3000/get-category-keywords");	
			if (!res.ok){
			} else {
				const data: Map<Category, Keyword[]> = res.json();
				setCategoryKeywords(data);
			}
		}
		getKeywordsForCategories();
	}, []);
		
	const CategorySection = () => {
		const categories = Objects.values(Category);
		return(
			<div className="grid grid-row-2 grid-col-4">
			{category.map.foreach((category) => (
				<button
				onClick={setSelectedCategory(category)}
				>
				</button>
			)}
			</div>
		)
	}

	const CategoryKeywordsSection = () => {
		const keywords = Objects.values(categoryKeywords[selectedCategory]);
		return(
			<div className="flex flex-wrap max-width-120">
			{keywords.map.foreach((keyword) => (
				<button
				onClick={}
				>
				</button>
			)	
			}
			</div>
		)
	}

	// per category on this page we show a list of keywords that can be attached to the project
	const handleClick = (): void =>{
		
	};


	return(
		<div>
			<form>

				<button
				onClick={handleClick}
				>
				</button>
			</form>
		</div>
	)
}
