import { Prisma } from "@prisma/client";
import prismaClient from "../prismaClient";
import {
  SubcategoryGetGTO,
  SubcategoryGetParamGTO,
} from "./interfaces/SubcategoryGetInput";
import categoriesService from "../categories/categories.service";

const getAllSubcategories = async (inputData: SubcategoryGetGTO) => {
  const where = await getAllSubcategoryWhere(inputData);

  const queryOprions: Prisma.SubcategoriesFindManyArgs = {
    where,
  };

  const subcategories = await prismaClient.subcategories.findMany(queryOprions);

  return { subcategories };
};
const getAllSubcategoryWhere = async (subcategoryGetGTO: SubcategoryGetGTO) => {
  const where: Prisma.SubcategoriesWhereInput = {};

  if (subcategoryGetGTO.category) {
    const category_id = await categoriesService.getCategoryIDByTitle(
      subcategoryGetGTO.category
    );

    where.category_id = category_id?.id;
  }

  return where;
};

const getSubcategoryByCategory = async (inputData: SubcategoryGetParamGTO) => {
  const where = await getSubcategoryByTitleWhere(inputData);
  const queryOprions: Prisma.SubcategoriesFindManyArgs = {
    where,
  };

  const subcategories = await prismaClient.subcategories.findMany(queryOprions);

  return { subcategories };
};

const getSubcategoryByTitleWhere = async (
  subcategoryGetParamGTO: SubcategoryGetParamGTO
) => {
  const where: Prisma.SubcategoriesWhereInput = {};

  if (subcategoryGetParamGTO.categoryName) {
    const category_id = await categoriesService.getCategoryIDByTitle(
      subcategoryGetParamGTO.categoryName
    );

    where.category_id = category_id?.id;
  }

  return where;
};

const getSubcategoryIDByTitle = async (subcategoryTitle: string) => {
  const subcategory_id = await prismaClient.subcategories.findFirst({
    where: {
      title: subcategoryTitle
        ? subcategoryTitle[0].toUpperCase() + subcategoryTitle.slice(1)
        : "",
    },
    select: { id: true },
  });

  return subcategory_id;
};

export default {
  getSubcategoryIDByTitle,
  getAllSubcategories,
  getSubcategoryByCategory,
};
