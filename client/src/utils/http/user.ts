import { UserData } from "@/lib/redux/store/auth/auth";
import { appFetchGet, appFetchPost } from ".";
import { appCookiGet } from "./cookie";

type AppUserProps = {
  registration?: UserData;
  login?: UserData;
};

export const appUserPost = async (userData: AppUserProps) => {
  for (const key of Object.keys(userData) as (keyof AppUserProps)[]) {
    const pathname = `user/${key}`;

    const json = userData[key] as UserData;
    const result = await appFetchPost<string>({ pathname, sendData: { json } });
    return result;
  }
};

export const appUserCheckGet = async (userToken: string ) => {

  const pathname = "user/check";

  const token = await appFetchGet<string>({
    pathname,
    authorization: userToken,
  });
  return token;
};
