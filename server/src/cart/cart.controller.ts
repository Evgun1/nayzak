import { Context, Next } from "hono";
import prismaClient from "../prismaClient";
import { CartGetDTO } from "./interfaces/CartGetInput";
import cartService from "./cart.service";
import { HTTPException } from "hono/http-exception";

class CartController {
  // async getAll(c: Context) {
  //   const cart = await prismaClient.cart.findMany();
  //   return c.json({ cart });
  // }

  async saveCart(c: Context) {
    const inputData = await c.req.json<CartGetDTO>();

    const saveCart = await cartService.saveCart(inputData);

    return c.json(saveCart);
  }

  async updateCart(c: Context) {
    const inputData = await c.req.json<CartGetDTO>();

    const saveCart = await cartService.updateCart(inputData);

    return c.json(saveCart);
  }

  async initCart(c: Context, next: Next) {
    const authorization = c.req.header("Authorization");

    if (!authorization) {
      throw new HTTPException(401, { message: "Not authorized" });
    }

    const cart = await cartService.check(authorization);

    return c.json({ cart });
  }

  async removeCart(c: Context) {
    const { id } = await c.req.json();

    await cartService.removeCart(id);

    return c.json({message: "Remove product"});
  }
}

export default new CartController();
