import { appFetchPost, appFetchPut } from '.';
import { CustomerItem } from '@/lib/redux/store/customer/customer';

export const appCustomersPost = async (formData: FormData) => {
	const pathname = 'customers';

	const { response, totalCount } = await appFetchPost<CustomerItem>({
		pathname,
		sendData: formData,
	});

	return response;
};

export const appCustomersPut = async (formData: FormData) => {
	const pathname = 'customers/update';

	const { response } = await appFetchPut<CustomerItem>({
		pathname,
		putData: formData,
	});

	return response;
};

export const appCustomersInitPost = async (token: string) => {
	const pathname = 'customers/init';

	const { response } = await appFetchPost<CustomerItem>({
		pathname,
		authorization: token,
	});

	return response;
};
