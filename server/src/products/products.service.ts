import { $Enums, Prisma, Products } from "@prisma/client";
import prismaClient from "../prismaClient";
import { ProductsGetDTO } from "./interfaces/ProductsGetDTO";
import { MainService } from "../utils/service/main.service";
import { QueryParameterTypes } from "../utils/service/service.type";
import { QueryParamHandler } from "../utils/query-params/QueryParams.service";
import { ReviewsService } from "../reviews/reviews.service";
import { privateDecrypt } from "crypto";
import { number, string } from "zod";

class ProductsOptions {
    private queryParams = new QueryParamHandler();
    private ratingAvg = new ReviewsService().ratingAvg;

    private supportedMimeTypes: Map<boolean, (data: string) => object> =
        new Map();

    private setupMimeTypes() {
        this.supportedMimeTypes.set(false, (data: string) => ({
            id: data,
        }));
        this.supportedMimeTypes.set(true, (data: string) => ({
            title: data.replaceAll("_", " "),
        }));
    }

    constructor() {
        this.setupMimeTypes();
    }

    async optionsGetAll(
        query: QueryParameterTypes,
        params?: { category: string; subcategory: string }
    ) {
        const filter = this.queryParams.filter<Prisma.ProductsWhereInput>(
            query,
            Prisma.ProductsScalarFieldEnum
        );

        if (query.minPrice && query.maxPrice)
            filter.mainPrice = {
                lte: parseInt(query.maxPrice.toString()),
                gte: parseInt(query.minPrice.toString()),
            };

        if (query?.category) {
            filter.Categories = {
                title: {
                    equals: query.category,
                    mode: "insensitive",
                },
            };
        }

        if (query?.subcategory) {
            filter.Subcategories = {
                title: {
                    equals: query.subcategory,
                    mode: "insensitive",
                },
            };
        }

        const orderBy =
            this.queryParams.orderBy<Prisma.ProductsOrderByWithRelationInput>(
                { sort: query.sort, sortBy: query.sortBy },
                Prisma.ProductsScalarFieldEnum
            );
        const take = this.queryParams.limit({ limit: query.limit });
        const skip = this.queryParams.offset({ offset: query.offset });

        const where: Prisma.ProductsWhereInput = {
            ...filter,
        };

        const options: Prisma.ProductsFindManyArgs = {
            where,
            orderBy,
            take,
            skip,
        };

        return options;
    }

    optionsGetOne(params: { productParam: string }) {
        const { productParam } = params;

        const productData = this.supportedMimeTypes.get(
            isNaN(Number(productParam))
        );

        if (!productData) return;

        const inputData = productData(productParam) as QueryParameterTypes;

        const where = this.queryParams.filter<Prisma.ProductsWhereInput>(
            inputData,
            Prisma.ProductsScalarFieldEnum
        );

        const option: Prisma.ProductsFindFirstArgs = {
            where,
        };

        return option;
    }

    optionsUpdate(inputData: ProductsGetDTO) {
        const {
            id,
            subcategoriesId,
            title,
            description,
            discount,
            price,
            status,
            categoriesId,
            mediaId,
        } = inputData;

        const mainPrice = price - (price * discount) / 100;

        const options: Prisma.ProductsUpdateArgs = {
            where: { id },
            data: {
                title,
                description,
                price,
                status,
                discount,
                mainPrice,
                categoriesId,
                subcategoriesId,
                updatedAt: new Date(),
                mediaId,
            },
        };

        return options;
    }

    optionsCreate(inputData: ProductsGetDTO) {
        const {
            discount,
            status,
            description,
            price,
            categoriesId,
            title,
            subcategoriesId,
            mediaId,
        } = inputData;
        const mainPrice = price - (price * discount) / 100;

        const options: Prisma.ProductsCreateArgs = {
            data: {
                title,
                status,
                discount,
                mainPrice,
                price,
                createdAt: new Date(),
                description,
                categoriesId,
                subcategoriesId,
                mediaId,
            },
        };

        return options;
    }

    optionsMinMaxPrice({
        category,
        subcategory,
    }: {
        category: string;
        subcategory: string;
    }) {
        const select: Prisma.ProductsSelect = {
            price: true,
            discount: true,
            mainPrice: true,
        };

        const where: Prisma.ProductsWhereInput = {
            Categories: { title: { equals: category, mode: "insensitive" } },
            Subcategories: {
                title: { equals: subcategory, mode: "insensitive" },
            },
        };

        const option: Prisma.ProductsFindManyArgs = {
            select,
            where,
        };

        return option;
    }
}

class ProductsService {
    private deleteData = new MainService().delete;
    private productsOptions = new ProductsOptions();
    private ratingAvg = new ReviewsService().ratingAvg;

    async getAllProducts(
        query: QueryParameterTypes,
        params?: { category: string; subcategory: string }
    ) {
        const options = await this.productsOptions.optionsGetAll(query, params);
        let sqlProducts = `
		SELECT *
		FROM (
			SELECT products.*, reviews."rating", media."img"
			FROM "Products" AS products
			INNER JOIN (
				SELECT "id"
				FROM "Categories" AS insCategories
				WHERE insCategories."title" ${query.category !== undefined ? `ILIKE '%${query.category}%'` : "IS NOT NULL"}
			) AS categories ON categories.id = products."categoriesId"
			INNER JOIN (
				SELECT "id"
				FROM "Subcategories" as insSubcategories
				WHERE insSubcategories."title" ${query.subcategory !== undefined ? `ILIKE '%${query.subcategory}%'` : "IS NOT NULL"}
			) AS subcategories ON subcategories."id" = products."subcategoriesId"
			LEFT JOIN (
        		SELECT inMedia.*, inMedia.src AS "img"
        		FROM "Media" AS inMedia
    		) AS media ON media.id = products."mediaId"
			LEFT JOIN (
				SELECT "productsId",  ROUND(AVG("rating")) AS rating
				FROM "Reviews" as insReviews
				GROUP BY
				"productsId"
			) AS reviews ON reviews."productsId" = products."id"
			ORDER BY ${query.sortBy === "rating" ? `reviews."rating" DESC NULLS LAST` : " NOT NULL"}
        	LIMIT (
                SELECT COUNT(*)
                FROM "Products"
				)
		) 
		`;

        if (query.search) {
            sqlProducts += ` WHERE "title" ILIKE '%${query.search}%'`;
        }

        if (query.minPrice && query.maxPrice) {
            sqlProducts += ` WHERE "mainPrice" BETWEEN ${query.minPrice} AND ${query.maxPrice}`;
        }

        if (query.id) {
            sqlProducts += `WHERE id IN (${query.id.toString().replaceAll(",", ", ")})`;
        }

        if (query.sortBy !== "rating" && query.sort) {
            sqlProducts += ` ORDER BY ${`"${query.sortBy === "price" ? "mainPrice" : query.sortBy}" ${query.sort.toUpperCase()}`}`;
        }
        if (query.limit) {
            sqlProducts += ` LIMIT ${parseInt(query.limit)}`;
        }

        if (query.offset) {
            sqlProducts += ` OFFSET ${parseInt(query.offset)}`;
        }

        const products =
            await prismaClient.$queryRawUnsafe<Products[]>(sqlProducts);

        // const products = await prismaClient.products.findMany(options);
        const productCounts = await prismaClient.products.count({
            where: options.where,
        });
        return { products, productCounts };
    }

    async getProduct(params: { productParam: string }) {
        const sqlProduct = `
        SELECT products.*, reviews."rating", media."img"
        FROM "Products" AS products
        LEFT JOIN (
            SELECT "productsId",  ROUND(AVG("rating")) AS rating
            FROM "Reviews" as insReviews
            GROUP BY "productsId"
        ) AS reviews ON reviews."productsId" = products."id"
        LEFT JOIN (
            SELECT inMedia.*, inMedia.src AS "img"
            FROM "Media" AS inMedia
        ) AS media ON media.id = products."mediaId"
        WHERE ${!isNaN(Number(params.productParam)) ? `products."id" = ${+params.productParam}` : `products."title" ILIKE '%${params.productParam}%'`}
        `;

        const product =
            await prismaClient.$queryRawUnsafe<Products[]>(sqlProduct);

        // const options = this.productsOptions.optionsGetOne(params);

        // const product = await prismaClient.products.findFirst(options);

        return product.pop();
    }

    async updateProduct(inputData: ProductsGetDTO) {
        const options = this.productsOptions.optionsUpdate(inputData);

        return prismaClient.products.update(options);
    }

    async createProduct(inputData: ProductsGetDTO) {
        const options = this.productsOptions.optionsCreate(inputData);

        return prismaClient.products.create(options);
    }

    async minMaxPrice(params: { category: string; subcategory: string }) {
        const options = this.productsOptions.optionsMinMaxPrice(params);

        const priceList = await prismaClient.products.findMany(options);

        const minPrice = Math.min(...priceList.map((value) => value.mainPrice));
        const maxPrice = Math.max(...priceList.map((value) => value.mainPrice));

        return { minPrice, maxPrice };
    }

    async deleteProducts(productsId: number | number[]) {
        return await this.deleteData("Products", productsId);
    }
}

export default new ProductsService();
