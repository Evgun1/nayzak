import { Category } from "../types/categories";
import { Product } from "../types/product";

export type fetchCategoriesProps = {
  urlSearchParams?: URLSearchParams;
};

export const useFetchCategoriesall = async (
  urlSearchParams?: URLSearchParams
) => {
  const res = await fetch(
    `http://localhost:3030/categories?${urlSearchParams}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText);
  }

  const result: Category[] = await res.json().then((data) => {
    return data.categories;
  });

  return result;
};
