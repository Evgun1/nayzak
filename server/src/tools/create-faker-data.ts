import dotenv from "dotenv";
import prismaClient from "../prismaClient";
import brandsFaker from "./faker/brandsFaker";
import categoriesFake from "./faker/categoriesFaker";
import productsFaker from "./faker/prodactsFaker";
import reviewsFaker from "./faker/reviewsFaker";
import subcategoriesFaker from "./faker/subcategoriesFaker";

dotenv.config();

const start = async () => {
  await prismaClient.$connect();
  // await brandsFaker();
  await categoriesFake();
  await subcategoriesFaker();
  await productsFaker();
  await reviewsFaker();
  await prismaClient.$disconnect();
};

start();
