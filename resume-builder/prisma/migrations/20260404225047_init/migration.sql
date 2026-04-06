/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Keyword` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectType` to the `BulletPoint` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BulletPoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "projectType" TEXT NOT NULL,
    "job" TEXT,
    "category" TEXT NOT NULL,
    "skillType" TEXT NOT NULL,
    CONSTRAINT "BulletPoint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BulletPoint" ("category", "content", "id", "job", "projectId", "skillType") SELECT "category", "content", "id", "job", "projectId", "skillType" FROM "BulletPoint";
DROP TABLE "BulletPoint";
ALTER TABLE "new_BulletPoint" RENAME TO "BulletPoint";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_name_key" ON "Keyword"("name");
