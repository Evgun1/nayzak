import { Hono } from "hono";
import WishlistController from "./wishlist.controller";
import wishlistValidation from "./wishlist.validation";

const wishlistRouter = new Hono();

wishlistRouter.use("/init", WishlistController.initWishlists);
wishlistRouter.post(
  "/",
  wishlistValidation.save,
  WishlistController.saveWishlists
);
wishlistRouter.delete(
  "/",
  wishlistValidation.remove,
  WishlistController.removeWishlists
);

export default wishlistRouter;
