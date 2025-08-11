interface OptionsItem {
    maxAge?: number;
    path?: string;
}

type SetProps = {
    name: string;
    value: string;
    options?: OptionsItem;
};

export function appCookieGet(name: string) {
    if (typeof document === "undefined") return;
    const cookie = document.cookie
        .split(";")
        .map((data) => data.trim().split("="))
        .find((value) => value[0] === name);

    if (!cookie) return;

    return cookie[1];
}

export function appCookieSet({ name, value, options }: SetProps) {
    document.cookie = `${name}=${value}; maxAge=${
        options?.maxAge ?? 3600
    }; path=${options?.path ?? "/"} `;
}

export function appCookieDelete(name: string) {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
