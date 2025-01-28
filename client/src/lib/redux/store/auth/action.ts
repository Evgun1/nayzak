import { AppDispatch } from '../../store';
import { authAction } from './auth';

import { useCookieSet as useCookieSet } from '@/hooks/useCookie';
import {
	appCredentialsPasswordPut,
	appCredentialsPost,
} from '@/utils/http/credentials';
import {
	appCookieDelete,
	appCookieGet,
	appCookieSet,
} from '@/utils/http/cookie';
import { appJwtDecode, appJwtSign } from '@/utils/jwt/jwt';
import {
	CredentialsDTO,
	CredentialsPasswordDTO,
	CredentialsStateItem,
} from '@/lib/redux/store/auth/credentials.type';

export const registrationAction = (userData: CredentialsDTO) => {
	return async function (dispatch: AppDispatch) {
		const formData = new FormData();

		formData.set('email', userData.email);
		formData.set('password', userData.password);

		try {
			const token = await appCredentialsPost({ registration: formData });

			if (!token) return;

			useCookieSet({
				name: 'user-token',
				value: token,
				options: { path: '/', maxAge: 3600 },
			});

			const data = appJwtDecode<CredentialsStateItem>(token);
			dispatch(authAction.setCredentials(data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const loginAction = (userData: CredentialsDTO) => {
	return async function (dispatch: AppDispatch) {
		try {
			const token = await appCredentialsPost({ login: userData });
			if (!token) return;

			appCookieSet({
				name: 'user-token',
				value: token,
				options: { path: '/', maxAge: 3600 },
			});

			const data = appJwtDecode(token);

			dispatch(authAction.setCredentials(data));
		} catch (e) {
			console.log(e);
		}
	};
};
export const changePasswordAction = (passwordData: CredentialsPasswordDTO) => {
	return async function () {
		const userToken = appCookieGet('user-token');
		if (!userToken) return;

		const { email }: CredentialsStateItem = appJwtDecode(userToken);

		const token = appJwtSign({
			oldPassword: passwordData.oldPassword,
			newPassword: passwordData.newPassword,
			email,
		});

		try {
			const text = await appCredentialsPasswordPut(token);

		} catch (error) {
			console.log(error);
		}
	};
};

export const logOutActive = () => {
	return async function (dispatch: AppDispatch) {
		dispatch(authAction.logOut());

		appCookieDelete('user-token');
	};
};

export function initAuth() {
	return async function (dispatch: AppDispatch) {
		const userToken = await appCookieGet('user-token');
		if (!userToken) return;

		try {
			const token = await appCredentialsPost({ init: userToken });

			if (!token) return;

			useCookieSet({
				name: 'user-token',
				value: token,
				options: { path: '/', maxAge: 3600 },
			});

			const user = appJwtDecode<CredentialsStateItem>(token);

			dispatch(authAction.setCredentials(user));
		} catch (error) {
			console.log(error);
		}
	};
}
