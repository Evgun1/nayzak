import { Context, Next } from "hono";
import prismaClient from "../prismaClient";
import { CartGetDTO, CartProductData } from "./interfaces/CartGetInput";
import cartService from "./cart.service";
import { HTTPException } from "hono/http-exception";
import { BodyData } from "hono/utils/body";

class CartController {
  // async getAll(c: Context) {
  //   const cart = await prismaClient.cart.findMany();
  //   return c.json({ cart });
  // }

  async saveCart(c: Context) {
    const token = c.req.header("authorization");
    const body = await c.req.json<CartProductData>();

    if (!token) return;

    const saveCart = await cartService.saveCart({
      product: body,
      userToken: token,
    });

    console.log(saveCart);

    return c.json(saveCart);
  }

  async updateCart(c: Context) {
    const userToken = c.req.header("authorization");
    const body = await c.req.json<CartProductData>();

    console.log(body, userToken);

    if (!userToken) return;

    const saveCart = await cartService.updateCart({ product: body, userToken });

    return c.json(saveCart);
  }

  async initCart(c: Context, next: Next) {
    const authorization = c.req.header("authorization");

    if (!authorization) {
      throw new HTTPException(401, { message: "Not authorized" });
    }

    const cart = await cartService.check(authorization);

    return c.json({ cart });
  }

  async removeCart(c: Context) {
    const { id } = await c.req.json();

    await cartService.removeCart(id);

    return c.json({ message: "Remove product" });
  }
}

export default new CartController();
