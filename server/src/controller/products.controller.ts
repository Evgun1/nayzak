import { title } from "process";
import { Context } from "hono";
import prismaClient from "../prismaClient";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { log } from "console";

class ProductsController {
  async getAll(c: Context) {
    let { page, limit, category, subcategory, offset, search } = c.req.query();

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

    limit = limit || "8";
    offset = offset || "0";

    const option: Prisma.ProductsFindManyArgs = {
      take: parseInt(limit),
      skip: parseInt(offset),
    };

    if (category_id && !subcategory_id) {
      option.where = { category_id };
    }
    if (!category_id && subcategory_id) {
      option.where = { subcategory_id };
    }
    if (category_id && subcategory_id) {
      option.where = { category_id, subcategory_id };
    }

    if (search) {
      option.where = { title: { contains: search } };
    }

    const products = await prismaClient.products.findMany(option);
    const productCounts = await prismaClient.products.count({where: option.where});

    return c.json({ products, productCounts });
  }

  async getProduct(c: Context) {
    const { productName } = c.req.param();

    const product = await prismaClient.products.findMany({
      where: { title: productName },
    });

    return c.json({ product });
  }

  async searchProduct(c: Context) {
    const { search } = c.req.param();

    const s = await prismaClient.$queryRaw`SELECT * FROM Products WHERE id = 1`;

    return c.json({ s });
  }
}

export default new ProductsController();
