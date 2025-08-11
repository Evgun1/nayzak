import { RootState } from "../../store";
import { appOrdersPost, OrdersUpload } from "@/lib/api/orders";
import { AppDispatch } from "../../store";
import { ordersAction } from "./orders";
import { removeCart } from "../cart/action";
import { notificationAction } from "../notification/notification";
import NotificationCheckout from "@/components/notification/NotificationCheckout";

export const initOrders = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const customerId = getState().customer.customerData?.id;
		if (!customerId) return;

		try {
			// const orders = await appOrdersPost({ init: { customerId } });
			const orders = {} as any;
			if (!orders) return;

			dispatch(ordersAction.uploadOrders(orders));
		} catch (error) {
			console.log(error);
		}
	};
};

export function uploadOrders(currentOrders: OrdersUpload) {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const ordersArr = [...getState().orders.ordersData];

		try {
			const orders = await appOrdersPost({ upload: currentOrders });
			if (!orders) return;

			ordersArr.push(...orders);
			dispatch(ordersAction.uploadOrders(ordersArr));

			const productsId = orders.map((val) => val.productsId);

			dispatch(removeCart(productsId as number[]));
			dispatch(notificationAction.toggle(NotificationCheckout()));

			window.localStorage.setItem("order-status-code", "200");
		} catch (error) {
			console.log(error);
		}
	};
}
