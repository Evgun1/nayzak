import { AppGetFetch, TagsItem } from "./interface/appGetFetch.interface";

let BASE_URL = "http://localhost:3030";
const BASE_URL_CATALOG = "http://localhost:8080";

type AppFetchProps = {
	pathname: string;
	searchParams?: URLSearchParams | string;
	init: RequestInit;
	customError?: React.ReactNode;
};

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
}: AppFetchProps): Promise<{
	result: T;
	totalCount: number;
	headers: Headers;
}> => {
	const url = `${BASE_URL_CATALOG}/${pathname}${
		searchParams ? `?${searchParams}` : ""
	}`;

	// init.next = { revalidate: 1 };
	// init.cache = "no-cache";

	try {
		const response = await fetch(url, init);

		if (!response.ok) {
			const text = await response.text();
			throw new Error(text);
		}

		const headers = response.headers;

		const totalCount = response.headers.has("X-Total-Count")
			? parseInt(response.headers.get("X-Total-Count") as string)
			: NaN;

		const result = (await response.json()) as T;
		return { result, totalCount, headers };
	} catch (error) {
		console.log(error);

		throw error;
	}
};

export const appFetchGet = async <T>({
	pathname,
	authorization,
	searchParams,
	cache,
}: AppGetFetch) => {
	const init: RequestInit = {};
	init.method = "GET";

	init.cache = cache?.request;
	init.next = {
		tags: cache?.tag ? [cache.tag] : undefined,
		revalidate: cache?.revalidate,
	};

	if (authorization) {
		init.headers = { Authorization: `Bearer ${authorization}` };
	}

	const result = await appFetch<T>({ init, pathname, searchParams });

	return result;
};

export type AppPostFetch = {
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
	const headers = new Headers();

	init.method = "POST";

	if (authorization) {
		headers.append("Authorization", `Bearer ${authorization}`);
	}

	if (sendData) {
		if (!(sendData instanceof FormData)) {
			headers.append("Content-Type", "application/json");
		}

		init.body =
			sendData instanceof FormData ? sendData : JSON.stringify(sendData);
	}

	init.headers = headers;

	const result = await appFetch<T>({ pathname, init });

	return result;
};

type AppPutFetch = {
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
	const headers = new Headers();
	init.method = "PUT";

	if (authorization) {
		headers.append("Authorization", `Bearer ${authorization}`);
	}

	if (!(putData instanceof FormData)) {
		headers.append("Content-Type", "application/json");
	}

	init.headers = headers;
	init.body = putData instanceof FormData ? putData : JSON.stringify(putData);

	const result = await appFetch<T>({ pathname, init });

	return result;
};

type AppDeleteFetch = {
	authorization?: string;
	pathname: string;
	deleteData: FormData | object;
};
export const appFetchDelete = async <T>({
	pathname,
	deleteData,
	authorization,
}: AppDeleteFetch) => {
	const init: RequestInit = {};
	const headers = new Headers();

	init.method = "DELETE";

	if (!(deleteData instanceof FormData)) {
		headers.append("Content-Type", "application/json");
	}
	if (authorization) {
		headers.append("Authorization", `Bearer ${authorization}`);
	}

	init.headers = headers;
	init.body =
		deleteData instanceof FormData
			? deleteData
			: JSON.stringify(deleteData);

	const result = await appFetch<T>({ pathname, init });

	return result;
};
