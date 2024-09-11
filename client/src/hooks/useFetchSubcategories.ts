import { Subcategory } from "../types/subcategories";

export type fetchSubcategoriesProps = {
  urlSearchParams?: URLSearchParams;
};

export const useFetchSubcategoryAll = async (urlSearchParams: URLSearchParams) => {
  const res = await fetch(
    `http://localhost:3030/subcategories?${urlSearchParams}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText);
  }

  const result: Subcategory[] = await res.json().then((data) => {
    return data.subcategories;
  });
  return result;
};

export const useFetchSubcategoryByCategory = async (params: string) => {
  const res = await fetch(
    `http://localhost:3030/subcategories/${
      params[0].toUpperCase() + params.slice(1)
    }`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText);
  }

  const result: Subcategory[] = await res.json().then((data) => {
    return data.subcategories;
  });

  return result;
};
