import express from "express";
import cors from "cors";
import type {  BulletPoint, Category, Keyword, AddAtsResult, BulletPointPrompt } from "../shared/types";
import { getBulletPointsForKeyword, checkForAts, getProjects, addKeyword, addBulletpoint, getCategoryKeywords } from "./operations";


const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  })
);

app.get("/check-ats", async (req,res) => {
	const query = req.query.ats as string;
	const results = await getBulletPointsForKeyword(query);
	res.json(results);
	console.log("use checked ats:", query);
});

app.get("/get-projects", async (req,res) => {
	const projects = await getProjects();
	res.json(projects);
	console.log("user requested for projects");
});

app.post("/add-ats", async (req,res) =>{
	const ats: Keyword[] = req.body;
	const result: AtsResult = {
		exists: false,
		added: false
	};
	for (const keyword: Keyword of ats){
		const exists: boolean = await checkForAts(keyword);
		if (exists) {
			console.log("failed to add ", keyword, "it already exists");
			result.exists = true;
		} else {
			const added: boolean = await addKeyword(keyword); 
			console.log("added : ", keyword.name, " to database");
			result.added = true;
		}
	}
	res.json(result);	
});

app.post("/add-bulletpoint", async (req,res) =>{
	const point: BulletPointPrompt = req.body;
	const result: boolean = await addBulletPoint(point);
	res.json(result);
	console.log("user attempted add bulletpoint, result: ", result);
});

app.post("/add-project", async (req,res) => {
	const project: Project = req.body;
	const result: boolean = await addProject(project);
	if (result){
	} else {
	}
	res.json(result);
});

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});

app.get("/get-category-keywords", async (req,res) => {
	const categoryKeywords: Map<Category, Keyword[]> = await getCategoryKeywords();
	res.json(categoryKeywords);
});


