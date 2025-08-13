import { CartItemData } from "@/redux/store/cart/cart";
import { appFetchDelete, appFetchGet, appFetchPost, appFetchPut } from ".";
import { CartItem } from "@/types/cart.types";

const tag = "cart";

export const appCartInitGet = async (token: string) => {
	const nginxPathname = `user/cart/init`;
	// const pathname = "cart/init";

	const { result } = await appFetchGet<CartItem[]>({
		authorization: token,
		pathname: nginxPathname,
		cache: { request: "no-cache" },
	});

	if (!result) return;

	return result;
};

type AppCartPost = {
	product: CartItemData;
};
export const appCartPost = async ({ product }: AppCartPost, token: string) => {
	const pathname = "cart";
	const nginxPathname = `user/cart`;

	const { productsId, amount } = product;

	const { result } = await appFetchPost<CartItem>({
		authorization: token,
		pathname: nginxPathname,
		sendData: { productsId, amount },
	});

	return result;
};

export const appCartPut = async (product: CartItemData, token: string) => {
	const pathname = "cart";
	const nginxPathname = `user/cart`;

	const { amount, productsId, id } = product;

	const { result } = await appFetchPut<CartItem>({
		authorization: token,
		pathname: nginxPathname,
		putData: { id, amount, productsId },
	});

	return result;
};

export const appCartDelete = async (id: number[], token: string) => {
	const pathname = "cart";
	const nginxPathname = `user/cart/`;

	const result = await appFetchDelete({
		authorization: token,
		pathname: nginxPathname,
		deleteData: { id: id },
	});

	return result;
};
