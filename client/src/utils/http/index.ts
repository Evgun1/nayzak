const BASE_URL = 'http://localhost:3030';

type AppFetchProps = {
	pathname: string;
	searchParams?: URLSearchParams;
	init: RequestInit;
	customError?: React.ReactNode;
};

const appFetch = async <T>({
	pathname,
	init,
	searchParams,
}: AppFetchProps): Promise<{ response: T; totalCount: number }> => {
	const url = `${BASE_URL}/${pathname}${
		searchParams ? `?${searchParams}` : ''
	}`;

	init.cache = 'no-cache';

	try {
		const res = await fetch(url, init);

		if (!res.ok) {
			const text = await res.text();
			throw new Error(text);
		}

		const response = (await res.json()) as T;
		const totalCount = parseInt(
			(res.headers.get('X-Total-Count') as string) ?? null
		);
		return { response, totalCount } as { response: T; totalCount: number };
	} catch (error) {
		throw error;
	}
};

type AppGetFetch = {
	pathname: string;
	searchParams?: URLSearchParams;
	authorization?: string;
};

export const appFetchGet = async <T>({
	pathname,
	authorization,
	searchParams,
}: AppGetFetch) => {
	const init: RequestInit = {};
	init.method = 'GET';

	if (authorization) {
		init.headers = { Authorization: `Bearer Token ${authorization}` };
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

	init.method = 'POST';

	if (authorization) {
		init.headers = { Authorization: authorization };
	}

	if (sendData) {
		if (!(sendData instanceof FormData)) {
			init.headers = { 'Content-Type': 'application/json' };
		}

		init.body =
			sendData instanceof FormData ? sendData : JSON.stringify(sendData);
	}

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
	init.method = 'PUT';

	if (authorization) {
		init.headers = { Authorization: authorization };
	}

	if (!(putData instanceof FormData)) {
		init.headers = { 'Content-Type': 'application/json' };
	}

	init.body = putData instanceof FormData ? putData : JSON.stringify(putData);

	const result = await appFetch<T>({ pathname, init });

	return result;
};

type AppDeleteFetch = {
	pathname: string;
	deleteData: FormData | object;
};
export const appFetchDelete = async <T>({
	pathname,
	deleteData,
}: AppDeleteFetch) => {
	const init: RequestInit = {};

	init.method = 'DELETE';

	if (!(deleteData instanceof FormData)) {
		init.headers = { 'Content-Type': 'application/json' };
	}

	init.body =
		deleteData instanceof FormData ? deleteData : JSON.stringify(deleteData);

	const result = await appFetch<T>({ pathname, init });

	return result;
};
