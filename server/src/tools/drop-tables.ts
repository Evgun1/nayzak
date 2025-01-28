import dotenv from "dotenv";
import prismaClient from "../prismaClient";
import { Prisma } from "@prisma/client";

dotenv.config();

async function start() {
  await prismaClient.$connect();

  for (const key in Prisma.ModelName) {
    await prismaClient.$queryRawUnsafe(`DROP TABLE "${key}" cascade `);
  }

  await prismaClient.$disconnect();
}

start();
