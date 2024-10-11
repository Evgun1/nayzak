import { appFetchGet, appFetchPost } from ".";
import { appCookiGet } from "./cookie";

type AppUserProps = {
  registration?: string;
  login?: string;
  check?: string;
};

export const appUserPost = async (userData: AppUserProps) => {
  for (const key of Object.keys(userData) as (keyof AppUserProps)[]) {
    if (!userData[key]) return;
    const pathname = `user/${key}`;

    const result = await appFetchPost<string>({
      pathname,
      authorization: userData[key],
    });
    return result;
  }
};

export const appUserCheckGet = async (userToken: string) => {
  const pathname = "user/check";

  const token = await appFetchPost<string>({
    pathname,
    authorization: userToken,
  });
  return token;
};
