import { headers } from "next/headers";
import { appFetchGet, appFetchPost, appFetchPut, AppPostFetch } from ".";
import { SignIn, SignUp } from "@/redux/store/auth/auth.type";

type AppUserProps = {
	registration?: SignUp;
	login?: SignIn;
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

export const appCredentialsLoginPost = async (param: SignIn) => {
	const pathname = "user/auth/login";
	const res = await appFetchPost<string>({
		pathname,
		sendData: param,
	});
	return res.result;
};

export const appCredentialsRegisterPost = async (param: SignUp) => {
	const pathname = "user/auth/registration";
	const res = await appFetchPost<{ message: string }>({
		pathname,
		sendData: param,
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
export const appCredentialsPasswordPut = async (passwordToken: string) => {
	// const pathname = "user/credentials/change-password";
	const nginx = `user/auth/change-password`;

	return await appFetchPut<string>({
		pathname: nginx,
		authorization: passwordToken,
	});
};

export const appCredentialsActivationGet = async (slug: string) => {
	const pathname = `user/auth/activation/${slug}`;
	return await appFetchGet<string>({
		pathname,
		cache: { request: "no-cache" },
	});
};
