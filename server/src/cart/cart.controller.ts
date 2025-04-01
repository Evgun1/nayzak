import { Context, Next } from "hono";
import { CartProductData } from "./interfaces/CartGetInput";
import cartService from "./cart.service";
import { QueryParameterTypes } from "../utils/service/service.type";
import getReqBody from "../tools/getReqBody";
import clearCache from "../utils/clear-cache/ClearCache";

class CartController {
    async getAll(c: Context) {
        const queryParams = c.req.query() as QueryParameterTypes;

        const { cart, totalCount } = await cartService.getAll(queryParams);

        c.res.headers.append("X-Total-Count", totalCount.toString());
        return c.json(cart);
    }

    async saveCart(c: Context) {
        const { customerID }: { customerID: number } = await c.req.json();
        const body = await c.req.json<CartProductData>();

        const saveCart = await cartService.saveCart({
            product: body,
            customerID,
        });

        // await clearCache("cart");
        return c.json(saveCart);
    }

    async updateCart(c: Context) {
        const { customerID }: { customerID: number } = await c.req.json();
        const body = await c.req.json<CartProductData>();
        try {
            const saveCart = await cartService.updateCart({
                product: body,
                customerID,
            });

            await clearCache("cart");
            return c.json(saveCart);
        } catch (error) {
            console.log(error);
        }
    }

    async initCart(c: Context, next: Next) {
        const { customerID }: { customerID: number } = await c.req.json();

        const cart = await cartService.init(customerID);

        return c.json(cart);
    }

    async removeCart(c: Context) {
        const body = (await getReqBody(c)) as { id: number | number[] };

        const data = await cartService.removeCart(body.id);

        await clearCache("cart");
        return c.json({ message: "Remove product" });
    }
}

export default new CartController();
