import { appCookieGet } from '@/utils/http/cookie';
import { AppDispatch, RootState } from '../../store';
import { appJwtDecode } from '@/utils/jwt/jwt';
import {
	appCustomersInitPost,
	appCustomersPost,
	appCustomersPut,
} from '@/utils/http/customer';
import { customerAction, CustomerItem } from './customer';
import { CredentialsDTO } from '../auth/credentials.type';

export const initCustomer = () => {
	return async (dispatch: AppDispatch) => {
		const token = appCookieGet('user-token');
		if (!token) return;

		try {
			const res = await appCustomersInitPost(token);

			dispatch(customerAction.setCustomer(res));
		} catch (error) {
			console.log(error);
		}
	};
};

export const writeCustomerAction = (customerForm: FormData) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const userToken = await appCookieGet('user-token');
		if (!userToken || userToken === undefined) return;

		const userData = appJwtDecode<CredentialsDTO>(userToken);

		const formData = new FormData();

		const objectForm = Object.fromEntries(customerForm);

		for (const key in objectForm) {

			if (key === 'email') {
				if (objectForm[key] !== userData.email) {
					console.log(true);
				}
				continue;
			}

			formData.set(key, objectForm[key]);
		}

		if (userData.id) {
			formData.set('credentialsID', userData.id.toString());
		}

		try {
			const customerID = getState().customer.customerData?.id;
			if (!customerID) return;

			formData.set('id', customerID.toString());

			const res = await appCustomersPut(formData);

			dispatch(customerAction.setCustomer(res));
		} catch (error) {
			console.log(error);
		}

		// if (getState().customer.customer !== null) {
		// }
	};
};
