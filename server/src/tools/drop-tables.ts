import dotenv from "dotenv";
import prismaClient from "../prismaClient";
dotenv.config();

async function start() {
  await prismaClient.$connect();
  await prismaClient.$queryRawUnsafe(
    'DROP TABLE "Brands", "Cart", "Categories", "Orders", "Products", "Reviews", "Subcategories", "Token", "Users", "Wishlist"'
  );

  await prismaClient.$disconnect();
}

start();
