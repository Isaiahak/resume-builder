import express from "express";
import "dotenv/config";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import type { bulletPoint, Keyword } from "../shared/types";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });

const prisma = new PrismaClient({ adapter });

const app = express();

app.get("/check-ats", async (req,res) => {
	const results = await prisma.getBulletPointsForKeyword(req.query.ats)
});

app.post("/add-ats", async (req,res) =>{
	console.log("add ats")	
});

app.post("/add-bulletpoint", async (req,res) =>{
	console.log("add bulletpoint")	
});

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
