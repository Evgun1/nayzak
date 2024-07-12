import { faker } from "@faker-js/faker";
import prismaClient from "../../prismaClient";

async function categoriesFake() {
  for (let index = 1; index <= 4; index++) {
    faker;

    await prismaClient.categories.create({
      data: {
        title: faker.commerce.department(),
      },
    });
  }
}

export default categoriesFake;
