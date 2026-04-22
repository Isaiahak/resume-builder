import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { PrismaClient } = require("../generated/prisma/client");
//import { PrismaClient } from "@prisma/client";
import type { BulletPoint, Keyword, Project } from "../shared/types";
import { Category } from "../shared/enums";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

type BulletPointsResult = {
  exists: boolean;
  bulletPoints: (BulletPoint & { keyword: string })[];
};

export async function getBulletPointsForKeyword(atsKeyword: string): Promise<BulletPointsResult> {
  // Find the keyword
  const keywordRecord = await prisma.keyword.findUnique({
    where: { name: atsKeyword },
  });

  const exists = !!keywordRecord;

  let bulletPoints: (BulletPoint & { keyword: string })[] = [];

  if (exists && keywordRecord) {
    // Find bullets linked to this keyword
    const bullets = await prisma.bulletPoint.findMany({
      where: {
        keywordLinks: { some: { keywordId: keywordRecord.id } },
      }
    });

// Attach the ATS keyword to each bullet
    bulletPoints = bullets.map(b => ({ ...b, keyword: atsKeyword }));
  }

  return {
    exists,
    bulletPoints,
  };
}

export async function getProjects(): Promise<Project[]>{
	const projects = await prisma.project.findMany();
	return projects;
}

export async function addKeyword(keyword: Keyword): Promise<boolean>{
	try{
		const ats = await prisma.keyword.create({
			data: {
				name: keyword.name,
				category: keyword.category,
				skillType: keyword.skillType,
				importance: keyword.importance
			}
		});
		console.log("successfully added to db");
		return true;
	} catch(err) {
		console.log("failed to save to db", err);
		return false;
	}
}

export async function addBulletpoint(bulletPoint: BulletPointPrompt): Promise<boolean>{
	try{
		const keywords = bulletPoint.keywords

		const point = await prisma.bulletpoint.create({
			data: {
				content: bulletPoint.content,
				projectType: bulletPoint.projectType,
				project: {
					connect: bulletPoint.project.id,
				},
				category: bulletPoint.category,
				skillType: bulletPoint.skillType,
				keywordLinks: {
					connect: keywords.map((keyword) => ({
						name:keyword
					}))
				}
			}
		});
		console.log("successfully added to db");
		return true;
	} catch(err){
		console.log("failed to save to db", err);
		return false;
	}
}

export async function checkForAts(ats: Keyword): Promise<boolean>{
	const keywordRecord = await prisma.keyword.findUnique({
	where: { name: ats.name },
	});

	const exists = !!keywordRecord;
	return exists
}

export async function checkForProject(name: string): Promise<boolean>{
	const keywordRecord = await prisma.project.findUnique({
	where: { name: name },
	});

	const exists = !!keywordRecord;
	return exists
}



export async function getCategoryKeywords(): Promise<Map<Category, Keyword[]>>{
	
	const categoryKeywords: Map<Category, Keyword[]> = new Map();
	const categories  = Object.values(Category);
	for (const category of categories ){
		const keywords: Keyword[] = await prisma.keyword.findMany({
			where: { category: category },
		})
		categoryKeywords[category] = keywords;
	}

	return categoryKeywords
}

export async function addProject(project: Project): Promise<boolean>{
	try {
		const proj: Project = await prisma.project.create({
			data: {
				name: project.name,
				description: project.description,
				startDate: project.startDate,
				endDate: project.endDate,
				type: project.type,
				categories: project.categories,
				keyword: {
					connect: project.keywords.map((keyword) => ({
							name: keyword.name
						}))
				}
			}		
		});
		console.log("successfully added: ", project.name);
		return(true);
	} catch(err){
		console.log("failed to save project", err);
		return(false);
	}
}
