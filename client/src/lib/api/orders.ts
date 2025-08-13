import { IOrder } from "@/types/orders.types";
import { appFetchGet, appFetchPost } from ".";

const tag = "orders";

export const appOrdersAllGet = async () => {
	const pathname = "orders";
	const nginxPathname = "order";
	const { result, totalCount } = await appFetchGet<IOrder>({
		pathname: nginxPathname,
		cache: { request: "no-cache" },
	});

	return { result, totalCount };
};

export interface OrdersUpload {
	addressesId: number;
	cartId: number[];
}

// export const appOrdersPost = async (ordersData: AppOrdersPostProps) => {
// 	const orderSuggestMap = new Map<
// 		string,
// 		(data: any) => Promise<OrdersItem[]>
// 	>()
// 		.set("upload", async (data: OrdersUpload) => {
// 			const { result } = await appFetchPost<OrdersItem[]>({
// 				pathname: nginxPathname,
// 				sendData: data,
// 			});

// 			return result;
// 		})

// 		.set("init", async (data: OrdersInit) => {
// 			const { result } = await appFetchPost<OrdersItem[]>({
// 				pathname: `${nginxPathname}/init`,
// 				sendData: { customerId: data.customerId },
// 			});

// 			return result;
// 		});

// 	for (const [key, value] of orderSuggestMap.entries()) {
// 		if (Object.keys(ordersData).includes(key)) {
// 			return await value(ordersData[key as keyof typeof ordersData]);
// 		}
// 	}
// };

export const appOrderInitGet = async (token: string) => {
	const nginxPathname = `order/init`;
	const { result } = await appFetchGet<IOrder[]>({
		pathname: nginxPathname,
		authorization: token,
		cache: { request: "no-cache" },
	});

	return result;
};

export const appOrderUpload = async (body: OrdersUpload, token: string) => {
	const pathname = "orders";

	const nginxPathname = "order/upload";

	const { result, totalCount } = await appFetchPost<IOrder[]>({
		pathname: nginxPathname,
		authorization: token,
		sendData: body,
	});

	return { orders: result, totalCount };
};
