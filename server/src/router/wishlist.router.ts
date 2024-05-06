import { Hono } from "hono";
import WishlistController from "../controller/wishlist.controller";

const wishlistRouter = new Hono();

wishlistRouter.get("/", WishlistController.getAll);

export default wishlistRouter;
