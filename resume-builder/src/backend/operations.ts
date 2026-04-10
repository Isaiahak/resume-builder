import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { PrismaClient } = require("../generated/prisma/client");
//import { PrismaClient } from "@prisma/client";
import type { BulletPoint, Keyword, Project } from "../shared/types";

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
      },
      include: {
        keywordLinks: true, // optional if you want the links
      },
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
		const ats = prisma.keyword.create(keyword);
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

		const point = prisma.bulletpoint.create({
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
	return exists;
}

