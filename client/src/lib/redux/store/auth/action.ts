import { User } from "@/hooks/useFetchUser";
import { AppDispatch } from "../../store";
import { authAction, UserData } from "./auth";
import { jwtDecode } from "jwt-decode";

export const registrationAction = (userData: UserData) => {
  return async function (dispath: AppDispatch) {
    const token = await User.useFetchAuth({ registration: userData });

    if (!token) return;

    document.cookie = `user-token=${token}; max-age=3600`;

    const user = jwtDecode<UserData>(token);
    dispath(authAction.setUser(user));
  };
};
export const loginAction = (userData: UserData) => {
  return async function (dispath: AppDispatch) {
    const token = await User.useFetchAuth({ login: userData });

    if (!token) return;

    document.cookie = `user-token=${token}; max-age=3600`;

    const user = jwtDecode<UserData>(token);
    dispath(authAction.setUser(user));
  };
};

export function checkAuth() {
  return async function (dispathc: AppDispatch) {
    const tocken = await User.useFetchCheck();

    if (!tocken) return;

    document.cookie = `user-token=${tocken};  max-age=3600`;
    const user = jwtDecode(tocken);

    dispathc(authAction.setUser(user));
  };
}
