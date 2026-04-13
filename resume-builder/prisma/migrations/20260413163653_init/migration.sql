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
    "projectType" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "skillType" TEXT NOT NULL,
    CONSTRAINT "BulletPoint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" DATETIME NOT NULL,
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

-- CreateTable
CREATE TABLE "ProjectCategories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    CONSTRAINT "ProjectCategories_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_KeywordToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_KeywordToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Keyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_KeywordToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_name_key" ON "Keyword"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_KeywordToProject_AB_unique" ON "_KeywordToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_KeywordToProject_B_index" ON "_KeywordToProject"("B");
