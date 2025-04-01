import { CustomerItem } from "@/types/customer.types";
import { appFetchGet, appFetchPost, appFetchPut } from ".";

const tag = "customers";

export const appCustomersGet = async (searchParams?: URLSearchParams) => {
    const pathname = `customers`;
    const { response } = await appFetchGet<CustomerItem[]>({
        tag,
        pathname,
        searchParams,
    });

    return response;
};

export const appCustomersOneGet = async (customersId: string) => {
    const pathname = `customers/${customersId}`;
    const { response } = await appFetchGet<CustomerItem>({
        tag,
        pathname,
    });

    return response;
};

export const appCustomersPost = async (formData: FormData) => {
    const pathname = "customers";

    const { response, totalCount } = await appFetchPost<CustomerItem>({
        tag,
        pathname,
        sendData: formData,
    });

    return response;
};

export const appCustomersPut = async (formData: FormData) => {
    const pathname = "customers/update";

    const { response } = await appFetchPut<CustomerItem>({
        tag,
        pathname,
        putData: formData,
    });

    return response;
};

export const appCustomersInitPost = async (token: string) => {
    const pathname = "customers/init";

    const { response } = await appFetchPost<CustomerItem>({
        tag,
        pathname,
        authorization: token,
    });

    return response;
};
