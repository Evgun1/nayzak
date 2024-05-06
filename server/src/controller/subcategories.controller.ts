import { Context } from "hono";
import prismaClient from "../prismaClient";
import { Prisma } from "@prisma/client";

class SubcategoriesContronner {
  async getAll(c: Context) {
    const { category } = c.req.query();

    const option: Prisma.SubcategoriesFindManyArgs = {};

    if (category) {
      const categoryId = await prismaClient.categories.findMany({
        where: { title: category[0].toUpperCase() + category.slice(1) },
        select: { id: true },
      });
      categoryId.map((value) => (option.where = { category_id: value.id }));
    }

    const subcategories = await prismaClient.subcategories.findMany(option);

    return c.json({ subcategories });
  }
}
export default new SubcategoriesContronner();
