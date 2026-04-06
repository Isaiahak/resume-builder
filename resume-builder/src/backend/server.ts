import express from "express";
import cors from "cors";
import { getBulletPointsForKeyword, getProjects } from "./operations"

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  })
);

app.get("/check-ats", async (req,res) => {
	const query = req.query.ats as string;
	const results = await getBulletPointsForKeyword(query)
	res.json(results)
});

app.get("/projects", async (req,res) => {
	const projects = await getProjects() 
	res.json(projects)
});

app.post("/add-ats", async (req,res) =>{
	console.log("add ats", req, res)	
});

app.post("/add-bulletpoint", async (req,res) =>{
	console.log("add bulletpoint", req, res)	
});

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
