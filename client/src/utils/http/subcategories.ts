import { useSearchParams } from "next/navigation";
import { appFetchGet } from ".";
import { Subcategory } from "@/types/subcategories";

export const appSubcategoriesGet = async (searchParams?: URLSearchParams) => {
  const pathname = "subcategories";

  const { subcategories } = await appFetchGet<{ subcategories: Subcategory[] }>(
    { pathname, searchParams }
  );

  return subcategories;
};


export const appSubcategoryByCategoryGet = async (params: string) => {
  const pathname = `subcategories/${params[0].toUpperCase() + params.slice(1)}`;

  const { subcategories } = await appFetchGet<{ subcategories: Subcategory[] }>(
    { pathname }
  );

  return subcategories;
};
