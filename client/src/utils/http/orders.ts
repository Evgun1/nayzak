import { OrdersItem } from '@/types/orders.types';
import { appFetchGet, appFetchPost } from '.';

const pathname = 'orders';

export const appOrdersAllGet = async () => {
	const { response, totalCount } = await appFetchGet<OrdersItem>({ pathname });

	return { response, totalCount };
};

export interface ordersUploadItem {
	addressesId: number;
	cartId: number[];
	credentialsId: number;
	customersId: number;
}
interface ordersInitItem {
	customerId: number;
}
type AppOrdersPostProps = {
	upload?: ordersUploadItem | FormData;
	init?: ordersInitItem;
};

export const appOrdersPost = async (ordersData: AppOrdersPostProps) => {
	const orderSuggestMap = new Map<
		string,
		(data: any) => Promise<OrdersItem[]>
	>()
		.set('upload', async (data: ordersUploadItem) => {
			const { response } = await appFetchPost<OrdersItem[]>({
				pathname,
				sendData: data,
			});

			return response;
		})

		.set('init', async (data: ordersInitItem) => {
			const { response } = await appFetchPost<OrdersItem[]>({
				pathname: `${pathname}/init`,
				sendData: { customerId: data.customerId },
			});

			return response;
		});

	for (const [key, value] of orderSuggestMap.entries()) {
		if (Object.keys(ordersData).includes(key)) {
			return await value(ordersData[key as keyof typeof ordersData]);
		}
	}
};
