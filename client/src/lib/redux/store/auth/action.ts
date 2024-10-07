import { AppDispatch } from "../../store";
import { authAction, UserData } from "./auth";

import { useCookiDelete, useCookiSet } from "@/hooks/useCookie";
import { appUserCheckGet, appUserPost } from "@/utils/http/user";
import { appCookiGet } from "@/utils/http/cookie";
import { appHash } from "@/utils/bcrypt/bcrypt";
import { appJwtDecode, appJwtSign } from "@/utils/jwt/jwt";

export const registrationAction = (userData: UserData) => {
  return async function (dispath: AppDispatch) {
    const hashPassword = await appHash(userData.password);
    if (!hashPassword) return;

    const userToken = await appJwtSign({
      email: userData.email,
      password: hashPassword,
    });
    if (!userToken) return;

    const token = await appUserPost({ registration: userToken });
    if (!token) return;

    if (token instanceof Error) {
      console.log(token.message);
    } else {
      useCookiSet({
        name: "user-token",
        value: token,
        options: { path: "/", maxAge: 3600 },
      });

      const user = appJwtDecode<UserData>(token);

      dispath(authAction.setUser(user));
    }
  };
};
export const loginAction = (userData: UserData) => {
  return async function (dispath: AppDispatch) {
    const token = await appUserPost({ login: "" });

    if (!token) return;

    if (token instanceof Error) {
      console.log(token.message);
    } else {
      useCookiSet({
        name: "user-token",
        value: token,
        options: { path: "/", maxAge: 3600 },
      });

      // const user = appJwtDecode<UserData>(token);

      dispath(authAction.setUser("user"));
    }
  };
};

export const logOut = () => {
  return async function (dispatch: AppDispatch) {
    dispatch(authAction.logOut());

    useCookiDelete("user-token");
  };
};

export function checkAuth() {
  return async function (dispathc: AppDispatch) {
    const userTokn = await appCookiGet("user-token");
    if (!userTokn) return;

    const token = await appUserCheckGet(userTokn);

    if (token instanceof Error) {
      console.log(token.message);
    } else {
      useCookiSet({
        name: "user-token",
        value: token,
        options: { path: "/", maxAge: 3600 },
      });
      // const user = appJwtDecode<UserData>(token);

      dispathc(authAction.setUser("user"));
    }
  };
}
