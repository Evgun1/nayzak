import { title } from "process";
import {
	appCartDelete,
	appCartInitGet,
	appCartPost,
	appCartPut,
} from "@/lib/api/cart";
import { AppDispatch, RootState } from "../../store";
import { cartAction, CartItemData } from "./cart";
import { useCookieGet } from "@/hooks/useCookie";
import { notificationAction } from "../notification/notification";
import NotificationCart from "@/components/notification/NotificationCart";
import { appOneProductGet } from "@/lib/api/products";
import { appCookieGet } from "@/lib/api/cookie";

export function initCart() {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const token = appCookieGet("user-token");
		if (!token) return;

		const cartProducts = await appCartInitGet(token);
		if (!cartProducts) return;

		console.log(cartProducts);

		dispatch(cartAction.saveCart(cartProducts));
	};
}

export function updateCart(currentProduct: CartItemData) {
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

export function removeCart(productsId: number | number[]) {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const token = appCookieGet("user-token");
		if (!token) return;

		const cart = getState().cart.productsArray.map((cart) => cart);
		const suggestRemoveCartMap = new Map<
			boolean,
			(data: any) => Promise<void>
		>()
			.set(true, async (data: number[]) => {
				const cartId = cart
					.filter((val) => data[cart.indexOf(val)] === val.productsId)
					.map((data) => data.id);

				await appCartDelete(cartId as number[], token);
				dispatch(cartAction.removeCart(cartId as number[]));
			})
			.set(false, async (data: number) => {
				const id = cart
					.filter((cart) => cart.productsId === productsId)
					.map((product) => product.id)
					.pop();
				if (!id) return;

				await appCartDelete(id, token);
				dispatch(cartAction.removeCart(id));
			});

		try {
			for (const [key, value] of suggestRemoveCartMap.entries()) {
				if (key === Array.isArray(productsId)) {
					await value(productsId);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
}
