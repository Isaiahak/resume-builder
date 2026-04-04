import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

type BulletPointsResult = {
  exists: boolean;
  bulletPoints: (BulletPoint & { keyword: string })[];
};

async function getBulletPointsForKeyword(atsKeyword: string): Promise<BulletPointsResult> {
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
