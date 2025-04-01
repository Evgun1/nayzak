import { json } from "stream/consumers";
import { revalidatePath, revalidateTag } from "next/cache";

const BASE_URL = "http://localhost:3030";

type AppFetchProps = {
    pathname: string;
    searchParams?: URLSearchParams;
    init: RequestInit;
    customError?: React.ReactNode;
};

interface TagsItem {
    addresses: "addresses";
    brands: "brands";
    cart: "cart";
    credentials: "credentials";
    customers: "customers";
    media: "media";
    orders: "orders";
    products: "products";
    reviews: "reviews";
    subcategories: "subcategories";
    wishlists: "wishlists";
    categories: "categories";
}

export const tags: TagsItem = {
    addresses: "addresses",
    brands: "brands",
    cart: "cart",
    credentials: "credentials",
    customers: "customers",
    media: "media",
    orders: "orders",
    products: "products",
    reviews: "reviews",
    subcategories: "subcategories",
    wishlists: "wishlists",
    categories: "categories",
};

const appFetch = async <T>({
    pathname,
    init,
    searchParams,
}: AppFetchProps): Promise<{ response: T; totalCount: number }> => {
    const url = `${BASE_URL}/${pathname}${
        searchParams ? `?${searchParams}` : ""
    }`;

    init.next = { revalidate: 1800 };

    try {
        const res = await fetch(url, init);

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text);
        }

        const response = (await res.json()) as T;
        const totalCount = parseInt(
            (res.headers.get("X-Total-Count") as string) ?? null
        );
        return { response, totalCount } as { response: T; totalCount: number };
    } catch (error) {
        throw error;
    }
};

type AppGetFetch = {
    tag: keyof TagsItem;
    pathname: string;
    searchParams?: URLSearchParams;
    authorization?: string;
};

export const appFetchGet = async <T>({
    tag,
    pathname,
    authorization,
    searchParams,
}: AppGetFetch) => {
    const init: RequestInit = {};
    init.method = "GET";
    init.next = { tags: [tag] };

    if (authorization) {
        init.headers = { Authorization: `Bearer Token ${authorization}` };
    }

    const result = await appFetch<T>({ init, pathname, searchParams });

    return result;
};

export type AppPostFetch = {
    tag: keyof TagsItem;
    pathname: string;
    authorization?: string;
    sendData?: FormData | object;
};
export const appFetchPost = async <T>({
    pathname,
    sendData,
    authorization,
}: AppPostFetch) => {
    const init: RequestInit = {};

    init.method = "POST";

    if (authorization) {
        init.headers = { Authorization: authorization };
    }

    if (sendData) {
        if (!(sendData instanceof FormData)) {
            init.headers = { "Content-Type": "application/json" };
        }

        init.body =
            sendData instanceof FormData ? sendData : JSON.stringify(sendData);
    }

    const result = await appFetch<T>({ pathname, init });

    return result;
};

type AppPutFetch = {
    tag: keyof TagsItem;
    pathname: string;
    putData?: FormData | object;
    authorization?: string;
};
export const appFetchPut = async <T>({
    pathname,
    putData,
    authorization,
}: AppPutFetch) => {
    const init: RequestInit = {};
    init.method = "PUT";

    if (authorization) {
        init.headers = { Authorization: authorization };
    }

    if (!(putData instanceof FormData)) {
        init.headers = { "Content-Type": "application/json" };
    }

    init.body = putData instanceof FormData ? putData : JSON.stringify(putData);

    const result = await appFetch<T>({ pathname, init });

    return result;
};

type AppDeleteFetch = {
    tag: keyof TagsItem;
    pathname: string;
    deleteData: FormData | object;
};
export const appFetchDelete = async <T>({
    pathname,
    deleteData,
}: AppDeleteFetch) => {
    const init: RequestInit = {};

    init.method = "DELETE";

    if (!(deleteData instanceof FormData)) {
        init.headers = { "Content-Type": "application/json" };
    }

    init.body =
        deleteData instanceof FormData
            ? deleteData
            : JSON.stringify(deleteData);

    const result = await appFetch<T>({ pathname, init });

    return result;
};
