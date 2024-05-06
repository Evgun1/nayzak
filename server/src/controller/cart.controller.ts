import { Context } from "hono";
import prismaClient from "../prismaClient";

class CartController {
  async getAll(c: Context) {
    const cart = await prismaClient.cart.findMany();
    return c.json({ cart });
  }
}

export default new CartController();
