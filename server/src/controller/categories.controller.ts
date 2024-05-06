import { Context } from "hono";
import prismaClient from "../prismaClient";

class CategoriesController {
  async getAll(c: Context) {
    const categories = await prismaClient.categories.findMany();

    return c.json({ categories });
  }
}

export default new CategoriesController();
