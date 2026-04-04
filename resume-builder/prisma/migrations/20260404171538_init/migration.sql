-- CreateTable
CREATE TABLE "Keyword" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "skillType" TEXT NOT NULL,
    "importance" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "BulletPoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "job" TEXT,
    "category" TEXT NOT NULL,
    "skillType" TEXT NOT NULL,
    CONSTRAINT "BulletPoint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BulletKeyword" (
    "bulletId" INTEGER NOT NULL,
    "keywordId" INTEGER NOT NULL,

    PRIMARY KEY ("bulletId", "keywordId"),
    CONSTRAINT "BulletKeyword_bulletId_fkey" FOREIGN KEY ("bulletId") REFERENCES "BulletPoint" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BulletKeyword_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
