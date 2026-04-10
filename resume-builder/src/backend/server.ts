import express from "express";
import cors from "cors";
import type {  BulletPoint, Keyword, AddAtsResult, BulletPointPrompt } from "../shared/types";
import { getBulletPointsForKeyword, checkForAts, getProjects, addKeyword, addBulletpoint } from "./operations";

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

app.get("/projects", async (req,res) => {
	const projects = await getProjects();
	res.json(projects);
	console.log("user requested for projects");
});

app.post("/add-ats", async (req,res) =>{
	const ats: Keyword = req.body;
	const exists: boolean = await checkForAts(ats);
	if (exists) {
		const result: AddAtsResult = {exists: true, added: false};
		res.json(result);
	} else {
		const added: boolean = await addKeyword(ats);
		const result: AddAtsResult = {exists: exists, added: added};
		res.json(result);
	}
});

app.post("/add-bulletpoint", async (req,res) =>{
	const point: BulletPointPrompt = req.body;
	const result: boolean = await addBulletPoint(point);
	res.json(result);
	console.log("user attempted add bulletpoint, result: ", result);
});

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
