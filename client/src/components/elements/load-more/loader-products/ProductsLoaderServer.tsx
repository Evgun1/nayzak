"use server";

import { appProductsGet } from "@/utils/http/products";
import ProductPreviewDefault from "@/components/elements/product-preview/product-preview-default/ProductsPreviewDefault";
import ProductsLoaderClient, {
    ListType,
} from "@/components/elements/load-more/loader-products/ProductsLoaderClient";
import { FC } from "react";
import ProductPreviewList from "../../product-preview/product-preview-list/ProductPreviewList";

type ProductsLoaderProps = {
    params?: string | string[];
    limit?: number;
    searchParams: Record<string, any>;
    listType?: keyof ListType;
    className?: string;
    rating?: boolean;
};

const ProductsLoaderServer: FC<ProductsLoaderProps> = async ({
    searchParams,
    // limit = 15,
    params,
    listType,
    className,
    rating = false,
}) => {
    const urlSearchParams = new URLSearchParams(searchParams);

    const listTypeLimits = new Map([
        ["default", "15"],
        [null, "15"],
        ["five_grid", "15"],
        ["four_grid", "12"],
        ["three_grid", "9"],
        ["two_grid", "8"],
        ["list", "8"],
    ]);

    const getListType = urlSearchParams.get("list_type");

    const getLimit = getListType
        ? (listTypeLimits.get(getListType) as string)
        : (listTypeLimits.get(listType ?? "default") as string);

    urlSearchParams.set("limit", getLimit);

    const { products, productCounts } = await appProductsGet({
        params: params,
        searchParams: urlSearchParams,
    });

    return (
        <ProductsLoaderClient
            params={params}
            listType={listType}
            totalCount={productCounts}
            className={className}
            rating={rating}
        >
            {products.map((product, i) => {
                if (searchParams["list_type"] === "list") {
                    return (
                        <ProductPreviewList
                            key={i}
                            rating={rating}
                            product={product}
                        />
                    );
                }
                return (
                    <ProductPreviewDefault
                        key={i}
                        className={className}
                        product={product}
                        rating={rating}
                    />
                );
            })}
        </ProductsLoaderClient>
    );
};

export default ProductsLoaderServer;
