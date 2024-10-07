import { log } from "console";
// import { ProductGetDTO } from "./products.service";
import { Prisma, Products } from "@prisma/client";
import prismaClient from "../prismaClient";
import categoriesService from "../categories/categories.service";
import subcategoryService from "../subcategories/subcategory.service";
import { en } from "@faker-js/faker";
import ProductsGetDTO, {
  ProductsSort,
  ProductsSortBy,
} from "./interfaces/ProductsGetInput";
import ProductGetDTO from "./interfaces/ProductGetInput";

async function getAllProducts(inputData: ProductsGetDTO) {
  const where = await productWhere(inputData);
  const orderBy = orderProducts(inputData);
  const take = queryLimit(inputData);
  const skip = queryOffset(inputData);


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

async function productWhere(productGetDTO: ProductsGetDTO) {
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

function orderProducts(productGetDTO: ProductsGetDTO) {
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

function queryLimit(productGetDTO: ProductsGetDTO) {
  const limit = productGetDTO.limit || "15";

  return parseInt(limit);
}

function queryOffset(productGetDTO: ProductsGetDTO) {
  const offset = productGetDTO.offset ?? "0";

  return parseInt(offset);
}

async function getProduct(productName: string) {
  const product = await prismaClient.products.findFirst({
    where: { title: productName },
  });

  return product;
}

export default {
  getAllProducts,
  getProduct,
};
