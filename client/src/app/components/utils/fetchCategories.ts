import { CategoriesType } from "../types/categories";
import { ProductTypes } from "../types/products";

export type fetchCategoriesProps = {
  urlSearchParams?: URLSearchParams;
};

export const fetchCategories = async ({
  urlSearchParams,
}: fetchCategoriesProps) => {
  const res = await fetch(
    `http://localhost:3030/categories?${urlSearchParams}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  const result: CategoriesType[] = await res.json().then((data) => {
    return data.categories;
  });

  return result;
};
