import { Context } from "hono";
import ordersService from "./orders.service";
import getReqBody from "../tools/getReqBody";
import { OrdersUploadItem } from "./orders.types";
import clearCache from "../utils/clear-cache/ClearCache";

class OrdersController {
    // async getAll(c: Context) {
    // 	const query = c.req.query();

    // 	const { count, orders } = await ordersService.getAll(query);

    // 	c.res.headers.append('X-Total-Count', count.toString());
    // 	c.json(orders);
    // }

    async upload(c: Context) {
        const body = await getReqBody<OrdersUploadItem>(c);
        if (!body) return;

        const orders = await ordersService.upload(body);

        await clearCache("orders");
        return c.json(orders);
    }

    async init(c: Context) {
        const body = await getReqBody<{ customerId: number }>(c);
        if (!body) return;

        const orders = await ordersService.init(body.customerId);

        return c.json(orders);
    }

    // async getOne(c: Context) {
    // 	const param = c.req.param();

    // 	const res = await ordersService.getOne();
    // }
    // async put(c: Context) {
    // 	const body = await getReqBody(c);

    // 	const res = await ordersService.put();
    // }
    // async delete(c: Context) {
    // 	const body = await getReqBody(c);

    // 	const res = await ordersService.delete();
    // }
}

export default new OrdersController();
