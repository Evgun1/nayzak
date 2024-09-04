import { AllPrice, Product } from "../types/product";
import { GetDynamicParamFromSegment } from "next/dist/server/app-render/app-render";
import useFetch from "./useFetch";

export type fetchProductsProps = {
  urlSearchParams?: URLSearchParams;
  params?: string[];
};

export namespace Products {
  export const useFetchAll = async ({
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

    type Result = {
      products: Product[];
      productCounts: number;
      productsPrice: AllPrice[];
    };

    const result = await useFetch<Result>({ url });

    const products: Product[] = result.products;
    const productCounts: number = result.productCounts;
    const productsPriceList: AllPrice[] = result.productsPrice;

    return { products, productCounts, productsPriceList };
  };

  export const useFetchOne = async (params: string) => {
    const result = await useFetch<Product>({
      url: `http://localhost:3030/products/${params.replaceAll("_", " ")}`,
    });

    return result;
  };

  export const useFetchMinMaxPrice = async (
    urlSearchParams: URLSearchParams
  ) => {
    type Result = {
      minPrice: number;
      maxPrice: number;
    };

    const res = await useFetch<Result>({
      url: `http://localhost:3030/products/min-max-price/?${urlSearchParams}`,
    });

    return res;
  };
}
