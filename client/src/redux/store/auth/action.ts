import { AppDispatch, RootState } from "../../store";
import { authAction } from "./auth";

import { useCookieSet as useCookieSet } from "@/hooks/useCookie";
import {
	appCredentialsInitGet,
	appCredentialsPasswordPut,
	appCredentialsPost,
} from "@/lib/api/credentials";
import { appCookieDelete, appCookieGet, appCookieSet } from "@/lib/api/cookie";
import {
	SignUp,
	CredentialsPasswordDTO,
	CredentialsStateItem,
	SignIn,
} from "@/redux/store/auth/auth.type";
import { initCustomer } from "../customer/action";
import { notificationAction } from "../notification/notification";
import PopupNotification from "@/popups/popup-notifications/PopupNotifications";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { jwtSign } from "@/lib/jwt/jwt";
import localStorageHandler from "@/tools/localStorage";

export const registrationAction = (userData: SignUp) => {
	return async function (dispatch: AppDispatch) {
		try {
			const token = await appCredentialsPost({ registration: userData });
			if (!token) return;

			useCookieSet({
				name: "user-token",
				value: token,
				options: { path: "/", maxAge: 3600 },
			});

			const data = jwtDecode<CredentialsStateItem>(token);

			dispatch(authAction.writeErrorMessage(null));
			dispatch(authAction.setCredentials(data));
			dispatch(initCustomer());
		} catch (error) {
			console.log(error);
		}
	};
};

export const loginAction = (userData: SignIn) => {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		try {
			const token = await appCredentialsPost({ login: userData });
			if (!token) return;

			console.log(token);

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
			const error = e as Error;
			console.log(error);

			dispatch(authAction.writeErrorMessage(error.message));
		}
	};
};

export const changePasswordAction = (passwordData: CredentialsPasswordDTO) => {
	return async function (dispatch: AppDispatch) {
		const userToken = appCookieGet("user-token");
		if (!userToken) return;

		const { email }: CredentialsStateItem = jwtDecode(userToken);

		const token = jwtSign({
			oldPassword: passwordData.oldPassword,
			newPassword: passwordData.newPassword,
			email,
		});

		try {
			const { result } = await appCredentialsPasswordPut(token);
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
			// if (err.message === 'U') {

			// }
			appCookieDelete("user-token");
			console.log(error, "error");
		}
	};
}
