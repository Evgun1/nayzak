import { Product } from "@/types/product";
import { appFetchGet } from ".";

type AppProductsGetProps = {
  searchParams?: URLSearchParams;
  params?: string[];
};

export const appProductsGet = async ({
  params,
  searchParams,
}: AppProductsGetProps = {}) => {
  let pathname = "products";

  if (searchParams) {
    pathname += `?${searchParams}`;
  }
  if (params) {
    pathname += `/by-params/${params.join("/")}`;
  }

  const result = await appFetchGet<{
    products: Product[];
    productCounts: number;
  }>({ pathname });
  const { productCounts, products } = result;

  return { productCounts, products };
};

export const appOneProductGet = async (productsID: number | string) => {
  const pathname = `products/${productsID}`;
  return await appFetchGet<Product>({ pathname });
};

export const appMinMaxPriceGet = async (searchParams: URLSearchParams) => {
  const pathname = "products/min-max-price/";

  return await appFetchGet<{ minPrice: number; maxPrice: number }>({
    pathname,
    searchParams,
  });
};
