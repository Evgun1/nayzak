import { AppDispatch } from "../../store";
import { authAction, UserData } from "./auth";

import { useCookiDelete, useCookiSet } from "@/hooks/useCookie";
import { appUserCheckGet, appUserPost } from "@/utils/http/user";
import { appCookiGet } from "@/utils/http/cookie";
import { appHash } from "@/utils/bcrypt/bcrypt";
import { appJwtDecode, appJwtSign } from "@/utils/jwt/jwt";

type ChangePasswordProps = {
  oldPassword: string;
  newPassword: string;
};

export const registrationAction = (userData: UserData) => {
  return async function (dispath: AppDispatch) {
    const hashPassword = await appHash(userData.password);
    if (!hashPassword) return;

    const userToken = appJwtSign({
      email: userData.email,
      password: hashPassword,
    });

    const token = await appUserPost({ registration: userToken });
    if (!token) return;

    useCookiSet({
      name: "user-token",
      value: token,
      options: { path: "/", maxAge: 3600 },
    });

    const user = appJwtDecode<UserData>(token);

    dispath(authAction.setUser(user));
  };
};
export const loginAction = (userData: UserData) => {
  return async function (dispath: AppDispatch) {
    const userToken = appJwtSign({
      email: userData.email,
      password: userData.password,
    });

    const token = await appUserPost({ login: userToken });

    if (!token) return;

    useCookiSet({
      name: "user-token",
      value: token,
      options: { path: "/", maxAge: 3600 },
    });

    dispath(authAction.setUser("user"));
  };
};
export const changePassword = () => {
  return async function (dispatch: AppDispatch) {};
};
export const logOut = () => {
  return async function (dispatch: AppDispatch) {
    dispatch(authAction.logOut());

    useCookiDelete("user-token");
  };
};
export function checkAuth() {
  return async function (dispathc: AppDispatch) {
    const userToken = await appCookiGet("user-token");
    if (!userToken) return;

    const token = await appUserPost({ check: userToken });

    if (!token) return;

    useCookiSet({
      name: "user-token",
      value: token,
      options: { path: "/", maxAge: 3600 },
    });

    console.log(authAction);

    dispathc(authAction.setUser("user"));
  };
}
