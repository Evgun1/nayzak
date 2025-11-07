import { title } from "process";
import {
	appCartDelete,
	appCartInitGet,
	appCartPost,
	appCartPut,
} from "@/lib/api/cart";
import { AppDispatch, RootState } from "../../store";
import { cartAction, CartItemData, CartState } from "./cart";
import { useCookieGet } from "@/hooks/useCookie";
import { notificationAction } from "../notification/notification";
import NotificationCart from "@/components/notification/NotificationCart";
import { appOneProductGet } from "@/lib/api/products";
import { appCookieGet } from "@/tools/cookie";
import localStorageHandler from "@/tools/localStorage";

export function initCart() {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const storage = localStorageHandler("cartState");
		const token = appCookieGet("user-token");
		const cartLocalStorage = storage.get();

		if (!token) return storage.delete();

		if (!cartLocalStorage) {
			const cartProducts = await appCartInitGet(token);
			if (!cartProducts) return;
			dispatch(cartAction.saveCart(cartProducts));
		}
	};
}

export function updateCart(currentProduct: Omit<CartItemData, "id">) {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const token = appCookieGet("user-token");

		if (!token) return;

		const productsCartArray = [...getState().cart.productsArray];

		const productIndex = productsCartArray.findIndex(
			({ productsId }) => productsId === currentProduct.productsId,
		);

		if (productIndex === -1) {
			const saveProduct = await appCartPost(
				{
					product: currentProduct,
				},
				token,
			);

			if (!saveProduct) return;

			const product = await appOneProductGet({
				slug: saveProduct.productsId.toString(),
			});

			dispatch(
				notificationAction.toggle(
					NotificationCart({ title: product.title }),
				),
			);

			productsCartArray.push(
				...[
					{
						id: saveProduct.id,
						productsId: saveProduct.productsId,
						amount: saveProduct.amount,
					},
				],
			);
		} else {
			currentProduct.amount += productsCartArray[productIndex].amount;

			const cartId = productsCartArray
				.filter((item) => item.productsId === currentProduct.productsId)
				.map((data) => data.id);

			const updateProduct = await appCartPut(
				{
					amount: currentProduct.amount,
					productsId: currentProduct.productsId,
					id: cartId[0],
				},
				token,
			);

			if (!updateProduct) return;
			const product = await appOneProductGet({
				slug: updateProduct.productsId.toString(),
			});

			dispatch(
				notificationAction.toggle(
					NotificationCart({ title: product.title }),
				),
			);

			productsCartArray[productIndex] = {
				id: updateProduct.id,
				productsId: updateProduct.productsId,
				amount: updateProduct.amount,
			};
		}

		dispatch(cartAction.saveCart(productsCartArray));
	};
}

export function changeAmount(currentProduct: CartItemData) {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const token = appCookieGet("user-token");
		if (!token) return;

		const productsArray = [...getState().cart.productsArray];

		const userToken = useCookieGet("user-token");
		if (!userToken) return;

		const productIndex = productsArray.findIndex(
			({ productsId }) => productsId === currentProduct.productsId,
		);
		if (productIndex === -1) return;

		const cartId = productsArray
			.filter((item) => item.productsId === currentProduct.productsId)
			.map((data) => data.id);

		const cartProduct = await appCartPut(
			{
				amount: currentProduct.amount,
				productsId: currentProduct.productsId,
				id: cartId[0],
			},
			token,
		);

		if (!cartProduct) return;

		productsArray[productIndex] = {
			amount: cartProduct.amount,
			productsId: cartProduct.productsId,
			id: cartProduct.id,
		};

		dispatch(cartAction.saveCart(productsArray));
	};
}

export function removeCart(productsId: number[] | number) {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const token = appCookieGet("user-token");
		if (!token) return;

		const cart = getState().cart.productsArray.map((cart) => cart);

		const productsArrId = Array.isArray(productsId)
			? productsId
			: [productsId];

		try {
			const filterCartId = cart
				.filter((cart) => {
					const productsFilter = productsArrId.find(
						(productId) => productId === cart.productsId,
					);
					if (productsFilter) return cart;
				})
				.map((cart) => cart.id);

			await appCartDelete(filterCartId, token);
			dispatch(cartAction.removeCart(filterCartId));
		} catch (error) {
			console.log(error);
		}
	};
}
