import { Context } from "hono";
import prismaClient from "../prismaClient";

class WishlistControler {
  async getAll(c: Context) {
    const wishlist = await prismaClient.wishlist.findMany();
    return c.json({ wishlist });
  }
}

export default new WishlistControler();
