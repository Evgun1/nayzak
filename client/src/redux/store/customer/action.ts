import { appCookieGet } from "@/lib/api/cookie";
import { AppDispatch, RootState } from "../../store";
import {
	appCustomersInitGet,
	appCustomersPost,
	appCustomersPut,
} from "@/lib/api/customer";
import { customerAction, CustomerItem } from "./customer";
import { SignUp } from "../auth/auth.type";
import { notificationAction } from "../notification/notification";
import NotificationCustomer from "@/components/notification/NotificationCustomer";
import PopupNotification from "@/popups/popup-notifications/PopupNotifications";
import { initAddress } from "../address/action";
import { initWishlist } from "../wishlist/action";
import { initCart } from "../cart/action";
import { initOrders } from "../orders/action";
import { jwtDecode } from "jwt-decode";
import { ICustomerAction } from "./type/customer-action.interface";
import { CustomerPost } from "@/types/customer.types";

export const initCustomer = () => {
	return async (dispatch: AppDispatch) => {
		const token = await appCookieGet("user-token");
		if (!token) return;

		try {
			const res = await appCustomersInitGet(token);

			if (res) {
				dispatch(customerAction.setCustomer(res));
				dispatch(initAddress());
				dispatch(initWishlist());
				dispatch(initCart());
				dispatch(initOrders());
			}
		} catch (error) {
			console.log(error);
		}
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
