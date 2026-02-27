import { PrismaClient } from "@prisma/client";

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET");

const prisma = new PrismaClient();

export default prisma;