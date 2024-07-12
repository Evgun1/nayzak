import { ProductTypes } from "../types/products";
import { GetDynamicParamFromSegment } from "next/dist/server/app-render/app-render";

export type fetchProductsProps = {
  urlSearchParams: URLSearchParams;
};

export const fetchProducts = async ({
  urlSearchParams,
}: fetchProductsProps) => {
  const res = await fetch(`http://localhost:3030/products?${urlSearchParams}`, {
    method: "GET",
    cache: "no-cache",
  });
  const result = await res.json();

  const products: ProductTypes[] = result.products;
  const productCounts: number = result.productCounts;

  return { products, productCounts };
};
  
type fetchProductProps = {  
  params: { slug: string };
};

export const fetchProduct = async ({ params }: fetchProductProps) => {
  const slug = params.slug.replaceAll("_", " ");

  const res = await fetch(`http://localhost:3030/products/${slug}`, {
    cache: "no-cache",
  });
  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText);
  }
  const result: { product: ProductTypes[]; productCounts: number } =
    await res.json();
  const productArray = result.product;

  if (!productArray) return;


  const product = {} as ProductTypes;
  productArray.forEach((value) => Object.assign(product, value));


  return product;
};
