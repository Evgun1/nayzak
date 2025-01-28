import { Hono } from 'hono';
import categoriesRoute from './categories/categories.route';
import brandsRouter from './brands/brands.router';
import cartRouter from './cart/cart.router';
import wishlistRouter from './wishlists/wishlist.router';
import reviewsRouter from './reviews/reviews.router';
import subcategoriesRoute from './subcategories/subcategories.route';
import customersRouter from './customers/customers.router';
import mediaRoute from './media/media.route';
import productRouter from './products/products.route';
import credentialsRoute from './credentials/credentials.route';
import addressesRoute from './addresses/addresses.route';
import orderRoute from './orders/orders.route';

const appRouter = new Hono();

appRouter.route('/products', productRouter);
appRouter.route('/categories', categoriesRoute);
appRouter.route('/brands', brandsRouter);
appRouter.route('/cart', cartRouter);
appRouter.route('/wishlists', wishlistRouter);
appRouter.route('/credentials', credentialsRoute);
appRouter.route('/reviews', reviewsRouter);
appRouter.route('/subcategories', subcategoriesRoute);
appRouter.route('/customers', customersRouter);
appRouter.route('/media', mediaRoute);
appRouter.route('/addresses', addressesRoute);
appRouter.route('/orders', orderRoute);

export default appRouter;
