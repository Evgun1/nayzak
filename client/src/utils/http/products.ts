import { ProductItem } from "@/types/product.types";
import { appFetchGet } from ".";

type AppProductsGetProps = {
    searchParams?: URLSearchParams;
    params?: string[] | string;
};

export const appProductsGet = async ({
    params,
    searchParams,
}: AppProductsGetProps = {}) => {
    let pathname = "products";

    if (params) {
        pathname += `/by-params/${
            Array.isArray(params) ? params.join("/") : params
        }`;
    }

    const { response, totalCount } = await appFetchGet<ProductItem[]>({
        searchParams,
        pathname,
    });

    return { productCounts: totalCount, products: response };
};

type AppProductsPyParamsGetProps = {
    searchParams?: URLSearchParams;
    params: string[] | string;
};

export const appProductsByParamsGet = async ({
    params,
    searchParams,
}: AppProductsPyParamsGetProps) => {
    let pathname = `products/by-params/${
        Array.isArray(params) ? params.join("/") : params
    }`;

    const { response, totalCount } = await appFetchGet<ProductItem[]>({
        pathname,
        searchParams,
    });

    return { productCounts: totalCount, products: response };
};

export const appOneProductGet = async (productsID: number | string) => {
    const pathname = `products/${productsID}`;

    const { response, totalCount } = await appFetchGet<ProductItem>({
        pathname,
    });

    return response;
};

export const appMinMaxPriceGet = async (
    searchParams: URLSearchParams,
    slug: string[] | string
) => {
    const param = Array.isArray(slug) ? slug.join("/") : slug;

    const pathname = `products/min-max-price/${param}`;

    const { response } = await appFetchGet<{
        minPrice: number;
        maxPrice: number;
    }>({
        pathname,
        searchParams,
    });
    return response;
};
