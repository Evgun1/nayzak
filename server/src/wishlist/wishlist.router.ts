import { Hono } from "hono";
import WishlistController from "./wishlist.controller";

const wishlistRouter = new Hono();

wishlistRouter.get("/", WishlistController.getAll);

export default wishlistRouter;
