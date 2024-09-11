import { Context } from "hono";
import wishilstService from "./wishilst.service";
import { HTTPException } from "hono/http-exception";
import { WishlistInputDTO } from "./interface/WishlistGetIntut";

class WishlistControler {
  async initWishlists(c: Context) {
    const userToken = c.req.header("Authorization");

    if (!userToken) throw new HTTPException(400, { message: "Not token" });

    const wishlists = await wishilstService.initWishlists(userToken);

    return c.json({ wishlists });
  }

  async saveWishlists(c: Context) {
    const inputData = await c.req.json<WishlistInputDTO>();

    const saveWishlists = await wishilstService.saveWishlist(inputData);

    return c.json(saveWishlists);
  }

  async removeWishlists(c: Context) {
    const { id } = await c.req.json();

    console.log(id);

    await wishilstService.deleteWishlist(id);
    return c.json({ message: "Product remove" });
  }
}

export default new WishlistControler();
