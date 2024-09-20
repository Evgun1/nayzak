import { Hono } from "hono";
import productRouter from "./products/products.router";
import categoriesRouter from "./categories/categories.router";
import brandsRouter from "./brands/brands.router";
import cartRouter from "./cart/cart.router";
import wishlistRouter from "./wishlists/wishlist.router";
import reviewsRouter from "./reviews/reviews.router";
import subcategoriesRouter from "./subcategories/subcategories.router";
import usersRouter from "./users/users.router";

const appRouter = new Hono();

appRouter.route("/products", productRouter);
appRouter.route("/categories", categoriesRouter);
appRouter.route("/brands", brandsRouter);
appRouter.route("/cart", cartRouter);
appRouter.route("/wishlists", wishlistRouter);
appRouter.route("/user", usersRouter);
appRouter.route("/reviews", reviewsRouter);
appRouter.route("subcategories", subcategoriesRouter);

export default appRouter;
