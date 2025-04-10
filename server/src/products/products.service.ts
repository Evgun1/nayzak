import {
    $Enums,
    Categories,
    Media,
    Prisma,
    Products,
    Reviews,
    Subcategories,
} from "@prisma/client";
import prismaClient from "../prismaClient";
import { ProductsGetDTO } from "./interfaces/ProductsGetDTO";
import { MainService } from "../utils/service/main.service";
import { QueryParameterTypes } from "../utils/service/service.type";
import { QueryParamHandler } from "../utils/query-params/QueryParams.service";
import { ReviewsService } from "../reviews/reviews.service";
import { sqlQuery } from "../../sql";

class ProductsOptions {
    private queryParams = new QueryParamHandler();

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

    async getAllProducts(
        query: QueryParameterTypes,
        params?: { category: string; subcategory: string }
    ) {
        const options = await this.productsOptions.optionsGetAll(query, params);

        const select = sqlQuery.select<Products>("Products");
        select.fields([
            "*",
            `CAST("Reviews"."rating" AS INT)`,
            `"Media"."src"`,
        ]);

        const categoriesJoin = await select.join<Categories>(
            "Categories",
            "INNER"
        );
        categoriesJoin.fields(["id"]);
        if (query.category)
            categoriesJoin.where({ title: `*${query.category}*` });
        categoriesJoin.on({ id: "categoriesId" });
        select.joinQuery();

        const subcategoriesJoin = select.join<Subcategories>(
            "Subcategories",
            "INNER"
        );
        subcategoriesJoin.fields(["id"]);

        if (query.subcategory)
            subcategoriesJoin.where({ title: `*${query.subcategory}*` });
        subcategoriesJoin.on({ id: "subcategoriesId" });
        select.joinQuery();

        const reviewsJoin = select.join<Reviews>("Reviews", "LEFT");
        reviewsJoin.fields(["productsId", 'ROUND(AVG("rating")) AS rating']);
        reviewsJoin.groupBy("productsId");
        reviewsJoin.on({ productsId: "id" });
        select.joinQuery();

        const mediaJoin = select.join<Media>("Media", "LEFT");
        mediaJoin.fields(["id", "src"]);
        mediaJoin.on({ id: "mediaId" });
        select.joinQuery();

        if (query.search) select.where({ title: `*${query.search}*` });
        if (query.minPrice && query.maxPrice)
            select.where({
                mainPrice: { between: [+query.minPrice, +query.maxPrice] },
            });
        if (query.id) select.where({ id: query.id });
        if (query.sortBy && query.sort) {
            const sort = query.sort.toUpperCase() as "ASC" | "DESC";
            switch (query.sortBy) {
                case "price":
                    select.orderBy("rating" as any, sort);
                    break;
                default:
                    select.orderBy(query.sortBy as any, sort);
                    break;
            }
        }
        if (query.limit) select.limit(+query.limit);
        if (query.offset) select.offset(+query.offset);

        const products = await select.query<Products[]>();
        const productCounts = await prismaClient.products.count({
            where: options.where,
        });

        return { products, productCounts };
    }

    async getProduct(params: { productParam: string }) {
        const select = sqlQuery.select<Products>("Products");
        const reviewsJoin = select.join<Reviews>("Reviews", "LEFT");
        reviewsJoin.fields(["productsId", 'ROUND(AVG("rating")) AS rating']);
        reviewsJoin.groupBy("productsId");
        reviewsJoin.on({ productsId: "id" });
        select.joinQuery();

        const mediaJoin = select.join<Media>("Media", "LEFT");
        mediaJoin.fields(["id", "src"]);
        mediaJoin.on({ id: "mediaId" });
        select.joinQuery();

        const product = await select.query<Products[]>();
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
