import { ProductItem } from "@/types/product.types";
import { appFetchGet } from ".";
import { revalidatePath, revalidateTag } from "next/cache";

type AppProductsGetProps = {
    searchParams?: URLSearchParams;
    params?: string[] | string;
};

const tag = "products";

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
        tag,
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
        tag,
        pathname,
        searchParams,
    });

    return { productCounts: totalCount, products: response };
};

export const appOneProductGet = async (productsID: number | string) => {
    const pathname = `products/${productsID}`;

    const { response, totalCount } = await appFetchGet<ProductItem>({
        tag,
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

    console.log(slug);

    const { response } = await appFetchGet<{
        minPrice: number;
        maxPrice: number;
    }>({
        tag,
        pathname,
        searchParams,
    });
    return response;
};
