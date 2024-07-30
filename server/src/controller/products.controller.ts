import { title } from "process";
import { Context } from "hono";
import prismaClient from "../prismaClient";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { log } from "console";

class ProductsController {
  async getAll(c: Context) {
    let {
      page,
      limit,
      category,
      subcategory,
      offset,
      search,
      minPrice,
      maxPrice,
    } = c.req.query();

    const category_id = await prismaClient.categories
      .findFirst({
        where: {
          title: category ? category[0].toUpperCase() + category.slice(1) : "",
        },
        select: { id: true },
      })
      .then((category) => category?.id);

    const subcategory_id = await prismaClient.subcategories
      .findFirst({
        where: {
          title: subcategory
            ? subcategory[0].toUpperCase() + subcategory.slice(1)
            : "",
        },
        select: { id: true },
      })
      .then((subcategory) => subcategory?.id);

    limit = limit || "15";
    offset = offset || "0";

    const option: Prisma.ProductsFindManyArgs = {
      take: parseInt(limit),
      skip: parseInt(offset),
    };

    const where: Prisma.ProductsWhereInput = {};

    if (category_id) where.category_id = category_id;

    if (subcategory_id) where.subcategory_id = subcategory_id;

    if (minPrice && maxPrice) {
      where.OR = [
        { mainPrice: { gte: +minPrice, lte: +maxPrice } },
        { price: { gte: +minPrice, lte: +maxPrice } },
      ];
    }

    if (search) {
      where.title = { contains: search };
    }

    if (where) option.where = where;

    const products = await prismaClient.products.findMany(option);
    const productCounts = await prismaClient.products.count({
      where: option.where,
    });

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
