import { Context, Next } from "hono";
import { decode } from "hono/jwt";
import credentialsService from "../credentials/credentials.service";
import prismaClient from "../prismaClient";
import { HTTPException } from "hono/http-exception";

class ProductMiddleware {
    async search(c: Context, next: Next) {
        const query = c.req.query() as { search: string };

        if (query.search) {
            const products = await prismaClient.products.findMany({
                where: {
                    title: { contains: query.search, mode: "insensitive" },
                },
            });

            if (products.length === 0) {
                throw new HTTPException(204, {
                    message: `Product not found for this request: ${query.search}`,
                });
            }
        }

        await next();
    }

    async delete(c: Context, next: Next) {
        const token = c.req.header("Authorization");

        if (!token)
            throw new HTTPException(401, { message: "Not authorization" });
        const credentials = await credentialsService.findCredentials({
            token,
        });

        if (credentials.role !== "admin") {
            throw new HTTPException(403, {
                message: "The client cannot delete the data",
            });
        }
        await next();
    }

    async create(c: Context, next: Next) {
        const token = c.req.header("Authorization");

        if (!token)
            throw new HTTPException(401, { message: "Not authorization" });
        const credentials = await credentialsService.findCredentials({
            token,
        });

        if (credentials.role !== "admin") {
            throw new HTTPException(403, {
                message: "The client cannot create the data",
            });
        }
        await next();
    }
}

export default new ProductMiddleware();
