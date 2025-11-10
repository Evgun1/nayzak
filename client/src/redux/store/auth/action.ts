import { AppDispatch, RootState } from "../../store";
import { authAction } from "./auth";

import { useCookieSet as useCookieSet } from "@/hooks/useCookie";
import {
	appCredentialsInitGet,
	appCredentialsLoginPost,
	appCredentialsPasswordPut,
	appCredentialsRegisterPost,
} from "@/lib/api/credentials";
import { appCookieDelete, appCookieGet, appCookieSet } from "@/tools/cookie";
import {
	CredentialsStateItem,
	SignInParam,
	CredentialsPasswordParam,
	SignUpParam,
} from "@/redux/store/auth/auth.type";
import { initCustomer } from "../customer/action";
import { notificationAction } from "../notification/notification";
import PopupNotification from "@/popups/popup-notifications/PopupNotifications";
import { jwtDecode } from "jwt-decode";
import localStorageHandler from "@/tools/localStorage";
import isValidJSONObjectString from "@/tools/isValidJSONObjectString";
import { popupActions } from "../popup/popup";

export const registrationAction = (userData: SignUpParam) => {
	return async function (dispatch: AppDispatch) {
		try {
			const result = await appCredentialsRegisterPost({
				...userData,
			});
			dispatch(
				notificationAction.toggle(
					PopupNotification({
						icon: "CHECK",
						text: result.message,
					}),
				),
			);
			dispatch(popupActions.toggle(null));
			dispatch(authAction.writeErrorMessage(null));
			dispatch(initCustomer());
		} catch (error) {
			const err = error as Error;

			if (isValidJSONObjectString(err.message)) {
				const objErr: {
					response: string;
					status: number;
					message: string;
					name: string;
				} = JSON.parse(err.message);

				dispatch(authAction.writeErrorMessage(objErr.message));
			} else {
				console.log(err);
			}
		}
	};
};

export const loginAction = (userData: SignInParam) => {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		try {
			const token = await appCredentialsLoginPost({ ...userData });
			if (!token) return;

			appCookieSet({
				name: "user-token",
				value: token,
				options: { path: "/", maxAge: 3600 },
			});

			const data = jwtDecode(token);

			dispatch(authAction.writeErrorMessage(null));
			dispatch(authAction.setCredentials(data));
			dispatch(initCustomer());
		} catch (e) {
			const err = e as Error;
			if (isValidJSONObjectString(err.message)) {
				const objErr: { statusCode: number; message: string[] } =
					JSON.parse(err.message);

				console.log(objErr.message);

				dispatch(
					authAction.writeErrorMessage(objErr.message.join(". ")),
				);
			} else {
				console.log(err);
			}
		}
	};
};

export const changePasswordAction = (
	passwordData: CredentialsPasswordParam,
) => {
	return async function (dispatch: AppDispatch) {
		const userToken = appCookieGet("user-token");
		if (!userToken) return;

		try {
			const { result } = await appCredentialsPasswordPut(
				passwordData,
				userToken,
			);
			dispatch(
				notificationAction.toggle(
					PopupNotification({
						icon: "CHECK",
						text: result,
					}),
				),
			);
		} catch (error) {
			console.log(error);
		}
	};
};

export const logOutActive = () => {
	return async function (dispatch: AppDispatch) {
		dispatch(authAction.logOut());

		appCookieDelete("user-token");
	};
};

export function initAuth() {
	return async function (dispatch: AppDispatch) {
		const userToken = await appCookieGet("user-token");
		const storage = localStorageHandler("all");

		if (!userToken)
			return storage.delete([
				"addressState",
				"cartState",
				"customerState",
				"ordersState",
				"wishlistState",
			]);

		try {
			const token = await appCredentialsInitGet(userToken);

			useCookieSet({
				name: "user-token",
				value: userToken,
				options: { path: "/", maxAge: 3600 },
			});

			const user = jwtDecode<CredentialsStateItem>(token as string);

			dispatch(authAction.setCredentials(user));
			dispatch(initCustomer());
		} catch (error) {
			const err = error as Error;
			appCookieDelete("user-token");

			// appCookieDelete("user-token");
		}
	};
}
