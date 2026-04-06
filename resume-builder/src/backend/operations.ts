import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

import type { BulletPoint, Project } from "../shared/types"
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
	return projects
}
