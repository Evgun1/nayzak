import { CustomerItem } from '@/types/customer.types';
import { appFetchGet, appFetchPost, appFetchPut } from '.';

export const appCustomersGet = async (searchParams?: URLSearchParams) => {
	const pathname = `customers`;
	const { response } = await appFetchGet<CustomerItem[]>({
		pathname,
		searchParams,
	});

	return response;
};

export const appCustomersOneGet = async (customersId: string) => {
	const pathname = `customers/${customersId}`;
	const { response } = await appFetchGet<CustomerItem>({ pathname });

	return response;
};

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

	console.log(formData);

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
