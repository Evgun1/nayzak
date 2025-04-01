import { Context, Next } from "hono";
import prismaClient from "../prismaClient";
import { HTTPException } from "hono/http-exception";
import getReqBody from "../tools/getReqBody";
import { WishlistInputDTO } from "./interface/WishlistGetInput";

class WishlistMiddleware {
    async upload(c: Context, next: Next) {
        const body = await getReqBody<WishlistInputDTO>(c);
        if (body) {
            const { currentProduct, customerID } = body;

            const wishlist = await prismaClient.wishlist.findFirst({
                where: {
                    customersId: customerID,
                    productsId: currentProduct.productID,
                },
            });

            if (wishlist) {
                throw new HTTPException(400, {
                    message: "This product already exists in the database",
                });
            }
        }

        await next();
    }

    async remove(c: Context, next: Next) {
        const { id } = await c.req.json();

        const wishlist = await prismaClient.wishlist.findFirst({
            where: { id },
        });

        if (!wishlist)
            throw new HTTPException(400, {
                message: `Product not found`,
            });

        await next();
    }
}

export default new WishlistMiddleware();
