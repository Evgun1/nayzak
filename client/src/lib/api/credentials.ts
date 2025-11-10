"use server";
import { headers } from "next/headers";
import { appFetchGet, appFetchPost, appFetchPut, AppPostFetch } from ".";
import {
	CredentialsPasswordParam,
	SignInParam,
	SignUpParam,
} from "@/redux/store/auth/auth.type";
import { jwtSign } from "../jwt/jwt";

type AppUserProps = {
	registration?: SignUpParam;
	login?: SignInParam;
	init?: string;
};

const tag = "credentials";

// export const appCredentialsPost = async (userData: AppUserProps) => {
// 	const fetchOptions = { pathname: "user/" } as AppPostFetch;

// 	const fetchHandlerPost = async (options: AppPostFetch) => {
// 		return await appFetchPost<string>(options);
// 	};

// 	const suggestMap = new Map()
// 		.set("registration", async (key: string, data: SignUp | FormData) => {
// 			fetchOptions.pathname += key;
// 			fetchOptions.sendData = data;

// 			await fetchHandlerPost(fetchOptions);
// 			// const token = await fetchHandlerPost(fetchOptions).then(
// 			// 	({ result }) => result,
// 			// );

// 			// return token;
// 		})
// 		.set("login", async (key: string, data: SignUp | FormData) => {
// 			fetchOptions.pathname += key;
// 			fetchOptions.sendData = data;
// 			const token = await fetchHandlerPost(fetchOptions).then(
// 				({ result }) => result,
// 			);

// 			return token;
// 		});

// 	for await (const [key, value] of suggestMap.entries()) {
// 		if (Object.keys(userData).includes(key)) {
// 			return value(key, userData[key as keyof AppUserProps]) as string;
// 		}
// 	}

// 	// for (const key of Object.keys(userData) as (keyof AppUserProps)[]) {
// 	//   if (!userData[key]) return;
// 	//
// 	//   if (typeof userData[key] === "object") {
// 	//     return await appFetchPost<CredentialsDTO>({
// 	//       pathname,
// 	//       sendData: userData[key]
// 	//     });
// 	//   }
// 	// }
// };

type AppCredentialsLoginPostParam = { payload: string };

export const appCredentialsLoginPost = async (param: SignInParam) => {
	const pathname = "user/auth/login";

	const jwt = jwtSign(param);

	const res = await appFetchPost<string>({
		pathname,
		sendData: { payload: jwt },
	});
	return res.result;
};

type AppCredentialsRegisterPostParam = {
	payload: string;
};
export const appCredentialsRegisterPost = async (param: SignUpParam) => {
	const pathname = "user/auth/registration";

	const jwt = jwtSign(param);
	const res = await appFetchPost<{ message: string }>({
		pathname,
		// sendData: param,
		sendData: { payload: jwt },
	});
	return res.result;
};

export const appCredentialsInitGet = async (token: string) => {
	// const pathname = "user/credentials/init";
	const nginx = `user/auth/init`;

	const { result } = await appFetchGet<{ access_token: string | undefined }>({
		pathname: nginx,
		authorization: token,
	});

	return result.access_token;
};

export const appCredentialsCheckGet = async (userToken: string) => {
	// const pathname = "user/credentials/check";
	const nginx = `user/auth/check`;

	return await appFetchGet<string>({
		cache: { request: "no-cache" },
		pathname: nginx,
		authorization: userToken,
	});
};

type AppCredentialsPasswordPutParam = { payload: string };
export const appCredentialsPasswordPut = async (
	param: CredentialsPasswordParam,
	userToken: string,
) => {
	// const pathname = "user/credentials/change-password";
	const nginx = `user/auth/change-password`;

	const jwt = jwtSign(param);

	return await appFetchPut<string>({
		pathname: nginx,
		putData: { payload: jwt },
		authorization: userToken,
	});
};

export const appCredentialsActivationGet = async (slug: string) => {
	const pathname = `user/auth/activation/${slug}`;
	return await appFetchGet<string>({
		pathname,
		cache: { request: "no-cache" },
	});
};
