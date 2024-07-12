import { Hono } from "hono";
import productRouter from "./products.router";
import categoriesRouter from "./categories.router";
import brandsRouter from "./brands.router";
import cartRouter from "./cart.router";
import wishlistRouter from "./wishlist.router";
import usersRouter from "./users,router";
import reviewsRouter from "./reviews.router";
import subcategoriesRouter from "./subcategories.router";

const appRouter = new Hono();

appRouter.route("/products", productRouter);
appRouter.route("/categories", categoriesRouter);
appRouter.route("/brands", brandsRouter);
appRouter.route("/cart", cartRouter);
appRouter.route("/wishlist", wishlistRouter);
appRouter.route("/user", usersRouter);
appRouter.route("/reviews", reviewsRouter);
appRouter.route("subcategories", subcategoriesRouter);

export default appRouter;
