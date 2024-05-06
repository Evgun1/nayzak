import dotenv from "dotenv";
import prismaClient from "../prismaClient";
dotenv.config();

export default async function start() {
  await prismaClient.$connect();
  await prismaClient.brands.deleteMany({});
  await prismaClient.categories.deleteMany({});
  await prismaClient.products.deleteMany({});
  await prismaClient.reviews.deleteMany({});
  await prismaClient.subcategories.deleteMany({});
  await prismaClient.$disconnect();
}

start();
