import { Hono } from "hono";
import WishlistController from "./wishlist.controller";
import wishlistController from "./wishlist.controller";
import wishlistMiddleware from "./wishlist.middleware";

const wishlistRouter = new Hono();

wishlistRouter.get("/", wishlistController.getAll);
wishlistRouter.use("/init", WishlistController.initWishlists);
wishlistRouter.post(
    "/",

    wishlistMiddleware.upload,
    WishlistController.saveWishlists
);
wishlistRouter.delete(
    "/",
    wishlistMiddleware.remove,
    WishlistController.removeWishlists
);

export default wishlistRouter;
