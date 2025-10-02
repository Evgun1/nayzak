import { CustomerItem, CustomerPut } from "@/types/customer.types";
import { appFetchGet, appFetchPost, appFetchPut } from ".";
import { ICustomerAction } from "@/redux/store/customer/type/customer-action.interface";

const tag = "customers";

export const appCustomersGet = async (searchParams?: URLSearchParams) => {
	const pathname = `customers`;
	const nginxPathname = `user/customers`;
	const { result } = await appFetchGet<CustomerItem[]>({
		pathname: nginxPathname,
		searchParams,
		cache: { request: "no-cache" },
	});

	return result;
};

export const appCustomersOneGet = async (customersId: string) => {
	const pathname = `customers/${customersId}`;
	const nginxPathname = `user/customers/${customersId}`;
	const { result } = await appFetchGet<CustomerItem>({
		pathname: nginxPathname,
		cache: { request: "no-cache" },
	});

	return result;
};

export const appCustomersPost = async (formData: FormData) => {
	const pathname = "customers";
	const nginxPathname = "user/customers";

	const { result, totalCount } = await appFetchPost<CustomerItem>({
		pathname: nginxPathname,
		sendData: formData,
	});

	return result;
};

export const appCustomersPut = async (
	inputData: CustomerPut,
	token: string,
) => {
	const nginxPathname = `user/customers/update`;
	const pathname = "customers/update";

	console.log(inputData);

	const { result } = await appFetchPut<CustomerItem>({
		authorization: token,
		pathname: nginxPathname,
		putData: inputData,
	});

	return result;
};

export const appCustomersInitGet = async (token: string) => {
	const pathname = "customers/init";
	const nginxPathname = `user/customers/init`;

	const { result } = await appFetchGet<CustomerItem>({
		pathname: nginxPathname,
		authorization: token,
		cache: { request: "no-cache" },
	});

	return result;
};
