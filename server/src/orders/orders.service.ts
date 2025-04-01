import { Orders, Prisma } from "@prisma/client";
import prismaClient from "../prismaClient";
import { OrdersProductsItem, OrdersUploadItem } from "./orders.types";
import { decode, jwt } from "hono/jwt";
import { QueryParamHandler } from "../utils/query-params/QueryParams.service";

class OrdersService {
    private queryParams = new QueryParamHandler();

    async upload(ordersItem: OrdersUploadItem) {
        const { cartId, customersId, addressesId } = ordersItem;
        const ordersArr: Prisma.OrdersCreateManyInput[] = [];

        const cartWhere = this.queryParams.filter<Prisma.CartWhereInput>(
            { id: cartId.toString() },
            Prisma.CartScalarFieldEnum
        );

        const cartOptions: Prisma.CartFindManyArgs = { where: cartWhere };
        const cart = await prismaClient.cart.findMany(cartOptions);

        for (const element of cart) {
            const product = await prismaClient.products.findFirst({
                where: { id: element.productsId },
            });

            if (element.customersId !== customersId) return;

            ordersArr.push({
                addressesId: addressesId,
                amount: element.amount,
                customersId: element.customersId,
                price: element.amount * (product?.mainPrice as number),
                productsId: element.productsId,
                updatedAt: new Date(),
                createdAt: new Date(),
                status: "pending",
            });
        }

        const orders = await prismaClient.orders.createManyAndReturn({
            data: ordersArr,
        });

        return orders;
    }

    async init(customerId: number) {
        const orders = await prismaClient.orders.findMany({
            where: { Customers: { id: customerId } },
            orderBy: { createdAt: "desc" },
        });

        return orders;
    }
}

export default new OrdersService();
