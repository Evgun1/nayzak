import { Hono } from 'hono';
import ordersController from './orders.controller';

const orderRoute = new Hono();

// orderRoute.get('/', ordersController.getAll);
orderRoute.post('/', ordersController.upload);
orderRoute.post('/init', ordersController.init);
// orderRoute.put('/', ordersController.put);
// orderRoute.delete('/', ordersController.delete);

export default orderRoute;
