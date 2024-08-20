import { log } from "console";
// import { ProductGetDTO } from "./products.service";
import { Prisma, Products } from "@prisma/client";
import prismaClient from "../prismaClient";
import categoriesService from "../categories/categories.service";
import subcategoryService from "../subcategories/subcategory.service";
import { en } from "@faker-js/faker";
import ProductGetDTO, {
  ProductsSort,
  ProductsSortBy,
} from "./interfaces/ProductGetInput";

async function getAllProducts(inputData: ProductGetDTO) {
  const where = await getProductWhere(inputData);
  const orderBy = getOrderProducts(inputData);
  const take = getQueryLimit(inputData);
  const skip = getQueryOffset(inputData);

  const queryOprions: Prisma.ProductsFindManyArgs = {
    where,
    orderBy,
    take,
    skip,
  };

  let products: Products[];
  if (inputData.sortBy === ProductsSortBy.RATING) {
    const productsByAvgRating = await prismaClient.products.findMany({
      ...queryOprions,
      include: {
        Reviews: { select: { rating: true } },
      },
    });

    const productsWithRating = productsByAvgRating.map((product) => ({
      ...product,
      averageRating: product.Reviews.length
        ? product.Reviews.reduce((sum, review) => sum + review.rating, 0) /
          product.Reviews.length
        : 0,
    }));

    products = productsWithRating
      .sort((a, b) => b.averageRating - a.averageRating)
      .map(
        ({
          brand_id,
          category_id,
          createdAt,
          description,
          discount,
          id,
          mainPrice,
          price,
          status,
          subcategory_id,
          title,
          updatedAt,
          // averageRating,
        }): Products => ({
          brand_id,
          category_id,
          createdAt,
          description,
          discount,
          id,
          mainPrice,
          price,
          status,
          subcategory_id,
          title,
          updatedAt,
          // averageRating,
        })
      );
  } else {
    products = await prismaClient.products.findMany(queryOprions);
  }

  const productCounts = await prismaClient.products.count({
    where: queryOprions.where,
  });

  return {
    products,
    productCounts,
  };
}

async function getProductWhere(productGetDTO: ProductGetDTO) {
  const where: Prisma.ProductsWhereInput = {};

  if (productGetDTO.minPrice && productGetDTO.maxPrice) {
    where.mainPrice = {
      gte: +productGetDTO.minPrice,
      lte: +productGetDTO.maxPrice,
    };
  }
  if (productGetDTO.search) {
    where.title = { contains: productGetDTO.search };
  }

  if (productGetDTO.subcategory) {
    const subcategoryID = await subcategoryService.getSubcategoryIDByTitle(
      productGetDTO.subcategory
    );
    if (subcategoryID) {
      where.subcategory_id = subcategoryID.id;
    }
  }

  if (productGetDTO.category) {
    const categoryID = await categoriesService.getCategoryIDByTitle(
      productGetDTO.category
    );
    if (categoryID) {
      where.category_id = categoryID.id;
    }
  }

  if (productGetDTO.id) {
    const idArr = productGetDTO.id.toString().split(",");
    where.id = { in: idArr.map((id) => +id) };
  }

  return where;
}

function getOrderProducts(productGetDTO: ProductGetDTO) {
  const orderBy: Prisma.ProductsOrderByWithRelationInput = {};

  if (productGetDTO.sortBy === ProductsSortBy.PRICE) {
    if (productGetDTO.sort === ProductsSort.ASC) {
      orderBy.mainPrice = "asc";
    } else {
      orderBy.mainPrice = "desc";
    }
    // if (productGetDTO.sort === ProductsSort.DESC) {
    // }
  }

  return orderBy;
}

function getQueryLimit(productGetDTO: ProductGetDTO) {
  const limit = productGetDTO.limit || "15";

  return parseInt(limit);
}

function getQueryOffset(productGetDTO: ProductGetDTO) {
  const offset = productGetDTO.offset ?? "0";

  return parseInt(offset);
}

export default {
  getAllProducts,
};
