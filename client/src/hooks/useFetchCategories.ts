import { Category } from "../types/categories";
import { Product } from "../types/product";

export type fetchCategoriesProps = {
  urlSearchParams?: URLSearchParams;
};

export const useFetchCategories = async ({
  urlSearchParams,
}: fetchCategoriesProps) => {
  const res = await fetch(
    `http://localhost:3030/categories?${urlSearchParams}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  const result: Category[] = await res.json().then((data) => {
    return data.categories;
  });

  return result;
};
