import { appFetchGet, appFetchPost, appFetchPut } from ".";
import { appCookieGet } from "./cookie";

type AppUserProps = {
  registration?: string;
  login?: string;
  check?: string;
};

export const appCredentialsPost = async (userData: AppUserProps) => {
  for (const key of Object.keys(userData) as (keyof AppUserProps)[]) {
    if (!userData[key]) return;
    const pathname = `credentials/${key}`;

    return await appFetchPost<string>({
      pathname,
      authorization: userData[key],
    });
  }
};

export const appCredentialsCheckGet = async (userToken: string) => {
  const pathname = "credentials/check";

  return await appFetchPost<string>({
    pathname,
    authorization: userToken,
  });
};
export const appCredentialsPasswordPut = async (passwordToken: string) => {
  const pathname = "credentials/change-password";

  return await appFetchPut<string>({
    pathname,
    authorization: passwordToken,
  });
};
