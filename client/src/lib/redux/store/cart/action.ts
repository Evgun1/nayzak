import {
	appCartDelete,
	appCartInitPost,
	appCartPost,
	appCartPut,
} from '@/utils/http/cart';
import { AppDispatch, RootState } from '../../store';
import { cartAction, CartItemData } from './cart';
import { useCookieGet } from '@/hooks/useCookie';
import { notificationAction } from '../notification/notification';
import NotificationCart from '@/components/elements/notification/NotificationCart';
import { appOneProductGet, appProductsGet } from '@/utils/http/products';

export function initCart() {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const customerID = getState().customer.customerData?.id;
		if (!customerID) return;

		const cartProducts = await appCartInitPost(customerID);
		if (!cartProducts) return;

		dispatch(cartAction.saveCart(cartProducts));
	};
}

export function updateCart(currentProduct: CartItemData) {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const customerID = getState().customer.customerData?.id;
		if (!customerID) return;

		const productsCartArray = [...getState().cart.productsArray];

		const productIndex = productsCartArray.findIndex(
			({ productID }) => productID === currentProduct.productID
		);

		if (productIndex === -1) {
			const saveProduct = await appCartPost({
				product: currentProduct,
				customerID,
			});

			if (!saveProduct) return;

			const product = await appOneProductGet(saveProduct.productID);
			dispatch(
				notificationAction.toggle(NotificationCart({ product: product }))
			);

			productsCartArray.push(
				...[
					{
						id: saveProduct.id,
						productID: saveProduct.productID,
						amount: saveProduct.amount,
					},
				]
			);
		} else {
			currentProduct.amount += productsCartArray[productIndex].amount;

			const cartId = productsCartArray
				.filter((item) => item.productID === currentProduct.productID)
				.map((data) => data.id);

			const updateProduct = await appCartPut(
				{
					amount: currentProduct.amount,
					productID: currentProduct.productID,
					id: cartId[0],
				},
				customerID
			);

			if (!updateProduct) return;
			const product = await appOneProductGet(updateProduct.productID);

			dispatch(
				notificationAction.toggle(NotificationCart({ product: product }))
			);

			productsCartArray[productIndex] = {
				id: updateProduct.id,
				productID: updateProduct.productID,
				amount: updateProduct.amount,
			};
		}

		dispatch(cartAction.saveCart(productsCartArray));
	};
}

export function changeAmount(currentProduct: CartItemData) {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const customerID = getState().customer.customerData?.id;
		if (!customerID) return;

		const productsArray = [...getState().cart.productsArray];

		const userToken = useCookieGet('user-token');
		if (!userToken) return;

		const productIndex = productsArray.findIndex(
			({ productID }) => productID === currentProduct.productID
		);
		if (productIndex === -1) return;

		const cartId = productsArray
			.filter((item) => item.productID === currentProduct.productID)
			.map((data) => data.id);

		const cartProduct = await appCartPut(
			{
				amount: currentProduct.amount,
				productID: currentProduct.productID,
				id: cartId[0],
			},
			customerID
		);

		if (!cartProduct) return;

		productsArray[productIndex] = {
			amount: cartProduct.amount,
			productID: cartProduct.productID,
			id: cartProduct.id,
		};

		dispatch(cartAction.saveCart(productsArray));
	};
}

export function removeCart(productId: number | number[]) {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const cart = getState().cart.productsArray.map((cart) => cart);
		const suggestRemoveCartMap = new Map<
			boolean,
			(data: any) => Promise<void>
		>()
			.set(true, async (data: number[]) => {
				const cartId = cart
					.filter((val) => data[cart.indexOf(val)] === val.productID)
					.map((data) => data.id);

				await appCartDelete(cartId as number[]);
				dispatch(cartAction.removeCart(cartId as number[]));
			})
			.set(false, async (data: number) => {
				const id = cart
					.filter((cart) => cart.productID === productId)
					.map((product) => product.id)
					.pop();
				if (!id) return;

				await appCartDelete(id);
				dispatch(cartAction.removeCart(id));
			});

		try {
			for (const [key, value] of suggestRemoveCartMap.entries()) {
				if (key === Array.isArray(productId)) {
					await value(productId);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
}
