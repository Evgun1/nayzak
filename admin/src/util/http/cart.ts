import { CartItemData } from "@/lib/redux/store/cart/cart";
import { appFetchDelete, appFetchGet, appFetchPost, appFetchPut } from ".";
import { CartType } from "@/types/cart";

export const appCartInitPost = async (customerID: number) => {
	const pathname = "cart/init";

	const cart = await appFetchPost<{ cart: CartType[] }>({
		pathname,
		sendData: JSON.stringify(customerID),
	});

	if (!cart) return;

	return cart.cart;
};

type AppCartPost = {
	product: CartItemData;
	customerID: number;
};
export const appCartPost = async ({ product, customerID }: AppCartPost) => {
	const pathname = "cart";

	const cart = await appFetchPost<CartType>({
		pathname,
		sendData: JSON.stringify({ product, customerID }),
	});

	return cart;
};

export const appCartPut = async (product: CartItemData, customerID: number) => {
	const pathname = "cart";

	const cart = await appFetchPut<CartType>({
		pathname,
		putData: JSON.stringify({ product, customerID }),
	});

	return cart;
};

export const appCartDelete = async (id: number) => {
	const pathname = "cart";

	const result = await appFetchDelete({
		pathname,
		deleteData: JSON.stringify({ id }),
	});

	return result;
};
