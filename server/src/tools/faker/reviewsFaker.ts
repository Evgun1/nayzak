import { faker, tr } from "@faker-js/faker";
import prismaClient from "../../prismaClient";

async function reviewsFaker() {
  const resultProducts = await prismaClient.products.findMany({
    select: { id: true },
  });

  const productsId = resultProducts.map((value) => value.id);

  for (let index = 0; index < productsId.length; index++) {
    const randomIndexProducts = Math.floor(Math.random() * productsId.length);
    const product_id = productsId[randomIndexProducts];

    const rating = Math.floor(Math.random() * 5 + 1);


    await prismaClient.reviews.create({
      data: {
        text: faker.lorem.text(),
        rating,
        product_id,
      },
    });
  }
}

export default reviewsFaker;
