import { Context } from "hono";
import prismaClient from "../prismaClient";
import { Prisma } from "@prisma/client";
import {
  SubcategoryGetGTO,
  SubcategoryGetParamGTO,
} from "./interfaces/SubcategoryGetInput";
import subcategoryService from "./subcategory.service";
import categoriesService from "../categories/categories.service";
import { log } from "util";

class SubcategoriesContronner {
  async getAll(c: Context) {
    const inputData = c.req.query() as SubcategoryGetGTO;
    const { subcategories } = await subcategoryService.getAllSubcategories(
      inputData
    );

    return c.json({ subcategories });
  }
  async getSubcategoryByCategory(c: Context) {
    const inputData = c.req.param() as SubcategoryGetParamGTO;

    const { subcategories } = await subcategoryService.getSubcategoryByCategory(
      inputData
    );


    return c.json({subcategories});
  }
}
export default new SubcategoriesContronner();
