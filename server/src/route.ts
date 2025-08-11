import { Hono } from "hono";
import categoriesRoute from "./categories/categories.route";
import brandsRouter from "./brands/brands.router";
import cartRouter from "./cart/cart.router";
import wishlistRouter from "./wishlists/wishlist.router";
import reviewsRouter from "./reviews/reviews.router";
import subcategoriesRoute from "./subcategories/subcategories.route";
import customersRouter from "./customers/customers.router";
import mediaRoute from "./media/media.route";
import productRouter from "./products/products.route";
import credentialsRoute from "./credentials/credentials.route";
import addressesRoute from "./addresses/addresses.route";
import orderRoute from "./orders/orders.route";

const appRouter = new Hono();

const allRouters = new Map<string, Hono>([
    ["/products", productRouter],
    ["/categories", categoriesRoute],
    ["/brands", brandsRouter],
    ["/cart", cartRouter],
    ["/wishlists", wishlistRouter],
    ["/credentials", credentialsRoute],
    ["/reviews", reviewsRouter],
    ["/subcategories", subcategoriesRoute],
    ["/customers", customersRouter],
    ["/media", mediaRoute],
    ["/addresses", addressesRoute],
    ["/orders", orderRoute],
]);

for (const [path, route] of allRouters.entries()) {
    appRouter.route(path, route);
}


export default appRouter;
