import { appFetchPost, appFetchPut } from ".";
import { CustomerData } from "@/lib/redux/store/customer/customer";

export const appCustomersPost = async (fomrData: fromData) => {
	const pathname = "customers";

	const result = await appFetchPost<{ customer: CustomerData }>({
		pathname,
		sendData: fomrData,
	});

	return result?.customer;
};

export const appCustomersPut = async (fomrData: fromData) => {
	const pathname = "customers/update";

	const result = await appFetchPut<{ customer: CustomerData }>({
		pathname,
		putData: fomrData,
	});

	return result?.customer;
};

export const appCustomersInitPost = async (token: string) => {
	const pathname = "customers/init";

	const result = await appFetchPost<{ customer: CustomerData }>({
		pathname,
		authorization: token,
	});

	return result?.customer;
};
