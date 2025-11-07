import { RootState } from "../../store";
import { AppDispatch } from "../../store";
import { ordersAction, OrderState } from "./orders";
import { removeCart } from "../cart/action";
import { notificationAction } from "../notification/notification";
import NotificationCheckout from "@/components/notification/NotificationCheckout";
import { appCookieGet } from "@/tools/cookie";
import {
	appOrderInitGet,
	appOrderUpload,
	OrdersUpload,
} from "@/lib/api/orders";
import localStorageHandler from "@/tools/localStorage";

export const initOrders = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const token = await appCookieGet("user-token");
		const storage = localStorageHandler("ordersState");

		if (!token) return storage.delete();
		if (storage.get()) return storage.get();

		try {
			const orderFetch = await appOrderInitGet(token);
			dispatch(ordersAction.uploadOrders(orderFetch));
		} catch (error) {
			console.log(error);
		}
	};
};

export function uploadOrders(currentOrders: OrdersUpload) {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const ordersArr = [...getState().orders.ordersData];
		const token = await appCookieGet("user-token");
		if (!token) return;

		try {
			const { orders } = await appOrderUpload(currentOrders, token);

			if (!orders) return;
			const productsId = orders.map((val) => val.productsId);
			ordersArr.push(...orders);

			dispatch(ordersAction.uploadOrders(ordersArr));
			dispatch(removeCart(productsId as number[]));
			dispatch(notificationAction.toggle(NotificationCheckout()));

			window.localStorage.setItem("order-status-code", "200");
		} catch (error) {
			console.log(error);
		}
	};
}
