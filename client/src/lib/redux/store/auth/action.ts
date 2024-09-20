import { AppDispatch } from "../../store";
import { authAction, UserData } from "./auth";
import { jwtDecode } from "jwt-decode";
import { useCookiDelete, useCookiSet } from "@/hooks/useCookie";
import { appUserCheckGet, appUserPost } from "@/utils/http/user";
import { appCookiGet } from "@/utils/http/cookie";

export const registrationAction = (userData: UserData) => {
  return async function (dispath: AppDispatch) {
    const token = await appUserPost({ registration: userData });

    if (!token) return;

    useCookiSet({
      name: "user-token",
      value: token,
      options: { path: "/", maxAge: 3600 },
    });

    const user = jwtDecode<UserData>(token);
    dispath(authAction.setUser(user));
  };
};
export const loginAction = (userData: UserData) => {
  return async function (dispath: AppDispatch) {
    const token = await appUserPost({ login: userData });

    if (!token) return;

    useCookiSet({
      name: "user-token",
      value: token,
      options: { path: "/", maxAge: 3600 },
    });

    const user = jwtDecode<UserData>(token);
    dispath(authAction.setUser(user));
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

    useCookiSet({
      name: "user-token",
      value: token,
      options: { path: "/", maxAge: 3600 },
    });
    const user = jwtDecode(token);

    dispathc(authAction.setUser(user));
  };
}
