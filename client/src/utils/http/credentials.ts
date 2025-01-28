import { appJwtDecode } from '@/utils/jwt/jwt';
import { appFetchGet, appFetchPost, appFetchPut, AppPostFetch } from '.';
import { CredentialsDTO } from '@/lib/redux/store/auth/credentials.type';

type AppUserProps = {
	registration?: CredentialsDTO | FormData;
	login?: CredentialsDTO | FormData;
	init?: string;
};

export const appCredentialsPost = async (userData: AppUserProps) => {
	const appFetchPostOptions = { pathname: `credentials/` } as AppPostFetch;

	const fetchHandlerPost = async (options: AppPostFetch) => {
		return await appFetchPost<string>(options);
	};

	const suggestMap = new Map()
		.set(
			'registration',
			async (key: string, data: CredentialsDTO | FormData) => {
				appFetchPostOptions.pathname += key;
				appFetchPostOptions.sendData = data;
				return await fetchHandlerPost(appFetchPostOptions).then(
					({ response }) => response
				);
			}
		)
		.set('login', async (key: string, data: CredentialsDTO | FormData) => {
			appFetchPostOptions.pathname += key;
			appFetchPostOptions.sendData = data;
			return await fetchHandlerPost(appFetchPostOptions).then(
				({ response }) => response
			);
		})
		.set('init', async (key: string, token: string) => {
			appFetchPostOptions.pathname += key;
			appFetchPostOptions.authorization = token;
			return await fetchHandlerPost(appFetchPostOptions).then(
				({ response }) => response
			);
		});

	for await (const [key, value] of suggestMap.entries()) {
		if (Object.keys(userData).includes(key)) {
			return value(key, userData[key as keyof AppUserProps]) as string;
		}
	}

	// for (const key of Object.keys(userData) as (keyof AppUserProps)[]) {
	//   if (!userData[key]) return;
	//
	//   if (typeof userData[key] === "object") {
	//     return await appFetchPost<CredentialsDTO>({
	//       pathname,
	//       sendData: userData[key]
	//     });
	//   }
	// }
};

export const appCredentialsCheckGet = async (userToken: string) => {
	const pathname = 'credentials/check';

	return await appFetchGet<string>({
		pathname,
		authorization: userToken,
	});
};
export const appCredentialsPasswordPut = async (passwordToken: string) => {
	const pathname = 'credentials/change-password';

	return await appFetchPut<string>({
		pathname,
		authorization: passwordToken,
	});
};
