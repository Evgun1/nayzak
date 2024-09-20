import { Category } from "@/types/categories";
import { appFetchGet } from ".";

export const appCategoriesGet = async (searchParams?: URLSearchParams) => {
  const pathname = "categories";

  const { categories } = await appFetchGet<{ categories: Category[] }>({
    pathname,
    searchParams,
  });

  return categories;
};
