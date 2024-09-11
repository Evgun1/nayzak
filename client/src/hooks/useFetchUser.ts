import { UserData } from "@/lib/redux/store/auth/auth";
import useFetch from "./useFetch";
import { useCookiGet } from "./useCookie";

type fetchUserProps = {
  registration?: UserData;
  login?: UserData;
};

  export async function useFetchUserAuth(userData: fetchUserProps | any) {
    for (const key in userData) {
      const result = await useFetch<string>({
        url: `http://localhost:3030/user/${key}`,
        method: "POST",
        contentType: "application/json",
        body: { json: userData[key] },
      });

      return result;
    }
  }

  export async function useFetchUserCheck() {
    const localToken = useCookiGet("user-token");

    const token = await useFetch<string>({
      url: `http://localhost:3030/user/check`,
      authorization: localToken,
      customError: (document.cookie = `user-token=; max-age=0; path=/;`),
    });

    return token;
  }
