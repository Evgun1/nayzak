import { appCookieGet } from "@/utils/http/cookie";
import { AppDispatch, RootState } from "../../store";
import { appJwtDecode } from "@/utils/jwt/jwt";
import {
    appCustomersInitPost,
    appCustomersPost,
    appCustomersPut,
} from "@/utils/http/customer";
import { customerAction, CustomerItem } from "./customer";
import { CredentialsDTO } from "../auth/credentials.type";
import { notificationAction } from "../notification/notification";
import NotificationCustomer from "@/components/elements/notification/NotificationCustomer";
import PopupNotification from "@/components/popup-notifications/PopupNotifications";
import { initAddress } from "../address/action";
import { initWishlist } from "../wishlist/action";
import { initCart } from "../cart/action";
import { initOrders } from "../orders/action";

export const initCustomer = () => {
    return async (dispatch: AppDispatch) => {
        const token = await appCookieGet("user-token");
        if (!token) return;

        try {
            const res = await appCustomersInitPost(token);

            dispatch(customerAction.setCustomer(res));

            dispatch(initAddress());
            dispatch(initWishlist());
            dispatch(initCart());
            dispatch(initOrders());
        } catch (error) {
            console.log(error);
        }
    };
};

export const writeCustomerAction = (customerForm: FormData) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const userToken = await appCookieGet("user-token");
        if (!userToken || userToken === undefined) return;

        const userData = appJwtDecode<CredentialsDTO>(userToken);
        const formData = new FormData();
        const objectForm = Object.fromEntries(customerForm.entries());

        for (const key in objectForm) {
            formData.set(key, objectForm[key]);
        }

        if (userData.id) {
            formData.set("credentialsId", userData.id.toString());
        }

        try {
            const customerID = getState().customer.customerData?.id;
            if (!customerID) return;

            formData.set("id", customerID.toString());
            const res = await appCustomersPut(formData);

            dispatch(customerAction.setCustomer(res));
            dispatch(
                notificationAction.toggle(
                    PopupNotification({
                        icon: "CHECK",
                        text: "Data updated successfully",
                    })
                )
            );
        } catch (error) {
            console.log(error);
        }

        // if (getState().customer.customer !== null) {
        // }
    };
};
