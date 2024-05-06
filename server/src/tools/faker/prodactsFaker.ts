import { faker } from "@faker-js/faker";
import prismaClient from "../../prismaClient";

async function productsFaker() {
  const statusArr = ["in stock", "out of stock", "disable"];
  const resultCategoies = await prismaClient.categories.findMany({
    select: { id: true },
  });
  const resultSubcategories = await prismaClient.subcategories.findMany({
    select: { id: true },
  });
  const resultBrnads = await prismaClient.brands.findMany({
    select: { id: true },
  });

  const categoriesId = resultCategoies.map((value) => value.id);
  const subcategoriesId = resultSubcategories.map((value) => value.id);
  const brandsId = resultBrnads.map((value) => value.id);

  for (let index = 1; index <= 100; index++) {
    const randomIndexStatus = Math.floor(Math.random() * statusArr.length);
    const status = statusArr[randomIndexStatus];

    const randomIndexCategories = Math.floor(
      Math.random() * categoriesId.length
    );
    const category_id = categoriesId[randomIndexCategories];

    const randomIndexSubcategories = Math.floor(
      Math.random() * subcategoriesId.length
    );
    const subcategory_id = subcategoriesId[randomIndexSubcategories];

    const randomIndexBrand = Math.floor(Math.random() * brandsId.length);
    const brand_id = brandsId[randomIndexBrand];

    const discount = Math.floor(Math.random() * 100 + 1);
    console.log(discount);

    await prismaClient.products.create({
      data: {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price({ min: 10, max: 1000 })),
        status,
        discount,
        brand_id,
        category_id,
        subcategory_id,
      },
    });
  }
}

export default productsFaker;
