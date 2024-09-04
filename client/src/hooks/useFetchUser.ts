import { UserData } from "@/lib/redux/store/auth/auth";
import useFetch from "./useFetch";
import { Token } from "./useToken";

type fetchUserProps = {
  registration?: UserData;
  login?: UserData;
};

export namespace User {
  export async function useFetchAuth(userData: fetchUserProps | any) {
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

  export async function useFetchCheck() {
    const localToken = await Token.useGet();

    if (!localToken) return;

    const token = await useFetch<string>({
      url: `http://localhost:3030/user/check`,
      authorization: localToken,
      customError: (document.cookie = `user-token=; max-age=0; path=/;`),
    });

    return token;
  }
}
