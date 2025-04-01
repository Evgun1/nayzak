import { Context } from "hono";
import prismaClient from "../prismaClient";
import { Prisma } from "@prisma/client";
import productsService from "./products.service";
import ProductsService from "./products.service";
import { ProductsGetDTO } from "./interfaces/ProductsGetDTO";
import getReqBody from "../tools/getReqBody";
import { QueryParameterTypes } from "../utils/service/service.type";
import { log } from "console";
import { json } from "stream/consumers";
import clearCache from "../utils/clear-cache/ClearCache";

class ProductsController {
    async getAll(c: Context) {
        const inputData = c.req.query() as QueryParameterTypes;

        try {
            const { products, productCounts } =
                await productsService.getAllProducts(inputData);

            return c.json(products, 200, {
                "X-Total-Count": productCounts.toString(),
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getAllByParams(c: Context) {
        const query = c.req.query() as QueryParameterTypes;
        const params = c.req.param() as {
            category: string;
            subcategory: string;
        };

        const inputData = {
            ...query,
            ...params,
        } as QueryParameterTypes;

        const { products, productCounts } =
            await productsService.getAllProducts(inputData);

        c.res.headers.append("X-Total-Count", productCounts.toString());
        return c.json(products);
    }

    async getProduct(c: Context) {
        const params = c.req.param() as { productParam: string };

        const product = await productsService.getProduct(params);
        return c.json(product);
    }

    async getMinMaxPrice(c: Context) {
        const param = c.req.param() as {
            category: string;
            subcategory: string;
        };

        const { maxPrice, minPrice } = await productsService.minMaxPrice(param);

        return c.json({ minPrice, maxPrice });
    }

    async create(c: Context) {
        const inputData = await c.req.json();

        const product = await ProductsService.createProduct(inputData);

        await clearCache("products");
        return c.json(product);
    }

    async change(c: Context) {
        const inputData = (await c.req.json()) as ProductsGetDTO;

        const product = await ProductsService.updateProduct(inputData);

        await clearCache("products");
        return c.json(product);
    }

    async delete(c: Context) {
        const productsId = (await getReqBody(c)) as number | number[];

        const id = await productsService.deleteProducts(productsId);

        await clearCache("products");
        return c.json(id);
    }
}

export default new ProductsController();
