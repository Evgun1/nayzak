import { ProductTypes } from "../types/products";

export type fetchProductsProps = {
  urlSearchParams?: URLSearchParams;
};

export const fetchCategories = async ({
  urlSearchParams,
}: fetchProductsProps) => {
  const res = await fetch(
    `http://localhost:3030/categories?${urlSearchParams}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  const result: ProductTypes[] = await res.json().then((data) => {
    return data.products;
  });

  return result;
};
