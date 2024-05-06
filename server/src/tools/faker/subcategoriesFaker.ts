import { faker } from "@faker-js/faker";
import prismaClient from "../../prismaClient";

export default async function subcategoriesFaker() {
  const resultCategoies = await prismaClient.categories.findMany({
    select: { id: true },
  });

  const categoriesId = resultCategoies.map((value) => value.id);

  for (let index = 1; index <= 20; index++) {
    const randomIndexCategories = Math.floor(
      Math.random() * categoriesId.length
    );
    const category_id = categoriesId[randomIndexCategories];

    await prismaClient.subcategories.create({
      data: {
        title: faker.commerce.product(),
        category_id,
      },
    });
  }
}
