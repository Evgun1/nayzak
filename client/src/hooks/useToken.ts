type SetProps = {
  token: string;
  maxAge: number;
};

export namespace Token {
  export function useGet() {
    const allCookies = document.cookie
      .split(";")
      .map((data) => data.split("="));

    const userToken = allCookies.find((data) =>
      data.find((string) => string.trim() === "user-token")
    );

    if (!userToken) return;

    return userToken[1];

    // const localCookie = document.cookie.match(
    //   new RegExp("(^| )" + "user-token" + "=([^;]+)")
    // ) as string | null;

    // return localCookie ? localCookie[2] : null;
  }
  export function useSet({ token, maxAge }: SetProps) {
    document.cookie = `user-token=${token}; ${
      maxAge ? `max-age=${maxAge}` : ""
    };`;
  }
  export async function useDelete() {
    document.cookie = `user-token=; max-age=0; path=/;`;
  }
}
