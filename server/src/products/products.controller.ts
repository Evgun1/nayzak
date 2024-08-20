import { Context } from "hono";
import prismaClient from "../prismaClient";
import { Prisma } from "@prisma/client";
import productsService from "./products.service";
import ProductGetDTO from "./interfaces/ProductGetInput";

class ProductsController {
  async getAll(c: Context) {
    const inputData = c.req.query() as ProductGetDTO;

    const { products, productCounts } = await productsService.getAllProducts(
      inputData
    );
    return c.json({ products, productCounts });
  }

  async getAllByParams(c: Context) {
    const { category, subcategory } = c.req.param();
    const query = c.req.query();

    const inputData = { ...query, category, subcategory } as ProductGetDTO;
    const { products, productCounts } = await productsService.getAllProducts(
      inputData
    );
    return c.json({ products, productCounts });
  }

  async getProduct(c: Context) {
    const { productName } = c.req.param();

    const product = await prismaClient.products.findMany({
      where: { title: productName },
    });

    return c.json({ product });
  }

  async getMinMaxPrice(c: Context) {
    let { category, subcategory } = c.req.query();

    let category_id = null;
    if (category) {
      const result = await prismaClient.categories.findFirst({
        where: { title: category[0].toUpperCase() + category.slice(1) },
        select: { id: true },
      });

      if (result) category_id = result.id;
    }

    let subcategory_id;
    if (subcategory) {
      const result = await prismaClient.subcategories.findMany({
        where: { title: subcategory[0].toUpperCase() + subcategory.slice(1) },
        select: { id: true },
      });

      result.map((value) => (subcategory_id = value.id));
    }

    const option: Prisma.ProductsFindManyArgs = {
      select: { price: true, discount: true, mainPrice: true },
    };

    if (category_id) {
      option.where = { category_id };
    }
    if (subcategory_id) {
      option.where = { subcategory_id };
    }
    if (category_id && subcategory_id) {
      option.where = { category_id, subcategory_id };
    }

    const priceList = await prismaClient.products.findMany(option);

    const minPrice = Math.min(
      ...priceList.map((value) => {
        if (!value.mainPrice) {
          return value.price;
        } else {
          return value.mainPrice;
        }
      })
    );

    const maxPrice = Math.max(
      ...priceList.map((value) => {
        if (!value.mainPrice) {
          return value.price;
        } else {
          return value.mainPrice;
        }
      })
    );

    return c.json({ minPrice, maxPrice });
  }
}

export default new ProductsController();
