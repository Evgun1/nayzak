type MethodData = "PUT" | "GET" | "POST" | "DELETE";

type ContentTypeData = "application/json" | "multipart/form-data";

interface BodyData {
  formData?: FormData;
  json?: object;
}

type UseFethcProps = {
  url: string | URL;
  authorization?: string;
  method?: MethodData;
  body?: BodyData;
  contentType?: ContentTypeData;
  customError?: any;
};

export default async function useFetch<T>({
  url,
  authorization,
  method = "GET",
  body,
  contentType = "application/json",
  customError,
}: UseFethcProps): Promise<T> {
  const headers = new Headers({
    "Content-Type": contentType,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
  });

  const init: RequestInit = {
    method,
    headers,
    cache: "no-cache",
  };

  if ((contentType = "application/json") && body?.json) {
    init.body = JSON.stringify(body.json);
  }

  if ((contentType = "multipart/form-data") && body?.formData) {
    init.body = body.formData;
  }

  if (authorization) headers.append("Authorization", authorization);

  const res = await fetch(url, init);

  if (!res.ok || res.status !== 200) {
    throw new Error(await res.text());
    if (customError) {
      customError;
    }
  }

  return (await res.json()) as Promise<T>;
}
