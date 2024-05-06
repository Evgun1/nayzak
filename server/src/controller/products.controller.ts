import { Context } from "hono";
import prismaClient from "../prismaClient";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import { DefaultArgs } from "@prisma/client/runtime/library";

class ProductsController {
  async getAll(c: Context) {
    let { page, limit, category, subcategory } = c.req.query();

    let category_id;
    if (category) {
      const result = await prismaClient.categories.findMany({
        where: { title: category[0].toUpperCase() + category.slice(1) },
        select: { id: true },
      });

      result.map((value) => (category_id = value.id));
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

    const option: Prisma.ProductsFindManyArgs = {
      take: parseInt(limit),
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

    const products = await prismaClient.products.findMany(option);

    return c.json({ products });
  }
}

export default new ProductsController();
