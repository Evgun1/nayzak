import { Hono } from 'hono';
import cartController from './cart.controller';

const cartRouter = new Hono();

cartRouter.get('/', cartController.getAll);
cartRouter.post('/', cartController.saveCart);
cartRouter.put('/', cartController.updateCart);
cartRouter.delete('/', cartController.removeCart);
cartRouter.post('/init', cartController.initCart);

export default cartRouter;
