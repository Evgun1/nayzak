import ErrorComponent from "@/components/elemets/error-component/ErrorComponent";
import { ReactNode } from "react";
import { log } from "util";

type MethodData = "PUT" | "GET" | "POST" | "DELETE";

type ContentTypeData = "application/json" | "multipart/from-data";

interface BodyData {
	fromData?: fromData;
	json?: object;
}

type AppFetch = <T>(
	pathname: string,
	searchParams?: URLSearchParams,
	init?: RequestInit,
	customError?: React.ReactNode, // Тип ReactNode потребує React імпорту
) => Promise<T>;

const BASE_URL = "http://localhost:3030";

type AppFetchProps = {
	pathname: string;
	searchParams?: URLSearchParams;
	init: RequestInit;
	customError?: React.ReactNode;
};

const appFetch = async <T>({
	pathname,
	customError,
	init,
	searchParams,
}: AppFetchProps): Promise<T> => {
	const url = `${BASE_URL}/${pathname}${
		searchParams ? `?${searchParams}` : ""
	}`;

	init.cache = "no-cache";

	try {
		const res = await fetch(url, init);

		if (!res.ok || res.status !== 200) {
			throw await res.text();
		}

		return (await res.json()) as T;
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
	init.method = "GET";

	if (authorization) {
		init.headers = { Authorization: authorization };
	}

	const result = await appFetch<T>({ init, pathname, searchParams });

	return result;
};

type AppPostFetch = {
	pathname: string;
	authorization?: string;
	sendData?: fromData | string;
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

	init.body = sendData;

	const result = await appFetch<T>({ pathname, init });

	return result;
};

type AppPutFetch = {
	pathname: string;
	putData?: fromData | string;
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

	init.body = putData;

	const result = await appFetch<T>({ pathname, init });

	return result;
};

type AppDeleteFetch = {
	pathname: string;
	deleteData: fromData | string;
};
export const appFetchDelete = async <T>({
	pathname,
	deleteData,
}: AppDeleteFetch) => {
	const init: RequestInit = {};

	init.method = "DELETE";
	init.body = deleteData;

	const result = await appFetch<T>({ pathname, init });

	return result;
};
