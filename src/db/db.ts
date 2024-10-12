import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | any ;
}

export const db = new PrismaClient(); 

if(process.env.NODE_ENV !== "production")
    globalThis.prisma = db; 

