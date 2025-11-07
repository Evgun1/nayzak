import { appCookieGet } from "@/tools/cookie";
import { AppDispatch, RootState } from "../../store";
import { appCustomersInitGet, appCustomersPut } from "@/lib/api/customer";
import { customerAction, CustomerState } from "./customer";
import { notificationAction } from "../notification/notification";
import PopupNotification from "@/popups/popup-notifications/PopupNotifications";
import { initAddress } from "../address/action";
import { initWishlist } from "../wishlist/action";
import { initCart } from "../cart/action";
import { initOrders } from "../orders/action";
import { ICustomerAction } from "./type/customer-action.interface";
import localStorageHandler from "@/tools/localStorage";

export const initCustomer = () => {
	return async (dispatch: AppDispatch) => {
		const token = await appCookieGet("user-token");
		const storage = localStorageHandler("customerState");
		// const localStorageCustomer = storage.get();
		if (!token) return storage.delete();
		const customerInit = await appCustomersInitGet(token);

		if (!customerInit) return;

		dispatch(customerAction.setCustomer(customerInit));
		dispatch(initAddress());
		dispatch(initWishlist());
		dispatch(initCart());
		dispatch(initOrders());
	};
};

export const writeCustomerAction = (inputData: ICustomerAction) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const userToken = await appCookieGet("user-token");
		if (!userToken) return;

		try {
			const customerID = getState().customer.customerData?.id;
			if (!customerID) return;

			const res = await appCustomersPut(inputData, userToken);

			dispatch(customerAction.setCustomer(res));
			dispatch(
				notificationAction.toggle(
					PopupNotification({
						icon: "CHECK",
						text: "Data updated successfully",
					}),
				),
			);
		} catch (error) {
			console.log(error);
		}

		// if (getState().customer.customer !== null) {
		// }
	};
};
