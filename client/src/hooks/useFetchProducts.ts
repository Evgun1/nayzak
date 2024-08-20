import { AllPrice, Product } from "../types/product";
import { GetDynamicParamFromSegment } from "next/dist/server/app-render/app-render";

export type fetchProductsProps = {
  urlSearchParams?: URLSearchParams;
  params?: string[];
};
export const useFetchAllProducts = async ({
  urlSearchParams,
  params,
}: fetchProductsProps) => {
  let url = "http://localhost:3030/products";

  if (params) {
    url += `/by-params/${params.join("/")}`;
  }

  if (urlSearchParams) {
    url += `?${urlSearchParams}`;
  }

  const res = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });
  const result = await res.json();

  const products: Product[] = result.products;
  const productCounts: number = result.productCounts;
  const productsPriceList: AllPrice[] = result.productsPrice;

  return { products, productCounts, productsPriceList };
};

type fetchProductProps = {
  params: { slug: string };
};
export const useFetchProduct = async ({ params }: fetchProductProps) => {
  const slug = params.slug.replaceAll("_", " ");

  const res = await fetch(`http://localhost:3030/products/${slug}`, {
    cache: "no-cache",
  });
  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText);
  }
  const result: { product: Product[]; productCounts: number } =
    await res.json();
  const productArray = result.product;

  if (!productArray) return;

  const product = {} as Product;
  productArray.forEach((value) => Object.assign(product, value));

  return product;
};

export const useFetchMinMaxPrice = async (
  urlSearchParams: URLSearchParams
): Promise<{
  minPrice: number;
  maxPrice: number;
}> => {
  const res = await fetch(
    `http://localhost:3030/products/min-max-price/?${urlSearchParams}`
  );

  if (!res.ok || res.status !== 200) throw new Error(res.statusText);

  return await res.json();
};
