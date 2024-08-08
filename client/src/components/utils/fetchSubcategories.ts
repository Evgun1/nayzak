import { SubategoriesType } from "../types/subcategories";

export type fetchSubcategoriesProps = {
  urlSearchParams?: URLSearchParams;
};

export const fetchSubcategories = async ({
  urlSearchParams,
}: fetchSubcategoriesProps) => {
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

  const result: SubategoriesType[] = await res.json().then((data) => {
    return data.subcategories;
  });
  return result;
};
