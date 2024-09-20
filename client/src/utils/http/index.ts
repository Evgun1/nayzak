import { ReactNode } from "react";

type MethodData = "PUT" | "GET" | "POST" | "DELETE";

type ContentTypeData = "application/json" | "multipart/form-data";

interface BodyData {
  formData?: FormData;
  json?: object;
}

type AppFetch = <T>(
  pathname: string,
  searchParams?: URLSearchParams,
  init?: RequestInit,
  customError?: React.ReactNode // Тип ReactNode потребує React імпорту
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
  const url = `${BASE_URL}/${pathname}?${searchParams}`;

  init.cache = "no-cache";

  const res = await fetch(url, init);

  if (!res.ok || res.status !== 200) {
    throw new Error(await res.text());
    if (customError) {
      customError;
    }
  }

  return (await res.json()) as T;
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

  return await appFetch<T>({ init, pathname, searchParams });
};

type AppPostFetch = {
  pathname: string;
  sendData: { json?: FormData | object; formData?: FormData };
};
export const appFetchPost = async <T>({ pathname, sendData }: AppPostFetch) => {
  const init: RequestInit = {};
  init.method = "POST";

  if (sendData.json) {
    const formDataJsonString = JSON.stringify(sendData.json);

    init.headers = { "Content-Type": "application/json" };
    init.body = formDataJsonString;
  }

  if (sendData.formData) {
    init.headers = { "Content-Type": "multipart/form-data" };
    init.body = sendData.formData;
  }

  return await appFetch<T>({ pathname, init });
};

type AppPutFetch = {
  pathname: string;
  putData: { json?: FormData | object; formData?: FormData };
};
export const appFetchPut = async <T>({
  pathname,
  putData: sendData,
}: AppPutFetch) => {
  const init: RequestInit = {};
  init.method = "PUT";

  if (sendData.json) {
    const formDataJsonString = JSON.stringify(sendData.json);
    init.headers = { "Content-Type": "application/json" };
    init.body = formDataJsonString;
  }

  if (sendData.formData) {
    init.headers = { "Content-Type": "multipart/form-data" };
    init.body = sendData.formData;
  }

  return await appFetch<T>({ pathname, init });
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

  const formDataJsonString = JSON.stringify(deleteData);

  init.method = "DELETE";
  init.headers = { "Content-Type": "application/json" };
  init.body = formDataJsonString;

  return await appFetch<T>({ pathname, init });
};
