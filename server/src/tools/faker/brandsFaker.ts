import { faker } from "@faker-js/faker";
import prismaClient from "../../prismaClient";
import { Brands } from "@prisma/client";

async function brandsFaker() {
  for (let index = 1; index < 10; index++) {
    await prismaClient.brands.create({
      data: { title: faker.company.name() },
    });
  }
}

export default brandsFaker;
