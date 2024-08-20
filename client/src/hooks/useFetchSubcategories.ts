import { Subcategory } from "../types/subcategories";

export type fetchSubcategoriesProps = {
  urlSearchParams?: URLSearchParams;
};
export const useFetchSubcategories = async ({
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

  const result: Subcategory[] = await res.json().then((data) => {
    return data.subcategories;
  });
  return result;
};

type FetchSubcategoriesByCategoryProps = {
  params: { slug: string };
};
export const useFetchSubcategoriesByCategory = async ({
  params,
}: FetchSubcategoriesByCategoryProps) => {
  const slug = params.slug;

  const res = await fetch(
    `http://localhost:3030/subcategories/${
      slug[0].toUpperCase() + slug.slice(1)
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
