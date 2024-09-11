interface OptionsItem {
  maxAge?: number;
  path?: string;
}

type SetProps = {
  name: string;
  value: string;
  options?: OptionsItem;
};

export function useCookiGet(name: string) {
  if (typeof document === "undefined") return;
  const cookie = document.cookie
    .split(";")
    .map((data) => data.trim().split("="))
    .find((value) => (value[0] = name));

  if (!cookie) return;

  return cookie[1];
}

export function useCookiSet({ name, value, options }: SetProps) {
  document.cookie = `${name}=${value}; maxAge=${
    options?.maxAge ?? 3600
  }; path=${options?.path ?? "/"} `;
}
export function useCookiDelete(name: string) {
  document.cookie = `${name}=; maxAge=0; path=/`;
}
