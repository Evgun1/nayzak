import { OrdersItem } from "@/types/orders.types";
import { appFetchGet, appFetchPost } from ".";

const pathname = "orders";

const tag = "orders";

export const appOrdersAllGet = async () => {
	const { result, totalCount } = await appFetchGet<OrdersItem>({
		pathname,
		cache: { request: "no-cache" },
	});

	return { result, totalCount };
};

export interface OrdersUpload {
	addressesId: number;
	cartId: number[] | number;
	credentialsId: number;
	customersId: number;
}
interface OrdersInit {
	customerId: number;
}
type AppOrdersPostProps = {
	upload?: OrdersUpload | FormData;
	init?: OrdersInit;
};

export const appOrdersPost = async (ordersData: AppOrdersPostProps) => {
	const orderSuggestMap = new Map<
		string,
		(data: any) => Promise<OrdersItem[]>
	>()
		.set("upload", async (data: OrdersUpload) => {
			const { result } = await appFetchPost<OrdersItem[]>({
				pathname,
				sendData: data,
			});

			return result;
		})

		.set("init", async (data: OrdersInit) => {
			const { result } = await appFetchPost<OrdersItem[]>({
				pathname: `${pathname}/init`,
				sendData: { customerId: data.customerId },
			});

			return result;
		});

	for (const [key, value] of orderSuggestMap.entries()) {
		if (Object.keys(ordersData).includes(key)) {
			return await value(ordersData[key as keyof typeof ordersData]);
		}
	}
};
