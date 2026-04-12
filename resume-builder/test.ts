import pkg from "./src/generated/prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

console.log("Prisma loaded");
