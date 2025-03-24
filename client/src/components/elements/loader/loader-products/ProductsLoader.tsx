"use server";

import { appProductsGet } from "@/utils/http/products";
import ProductPreviewDefault from "@/components/elements/product-preview/product-preview-default/ProductsPreviewDefault";
import ProductsLoaderClient, {
    ListType,
} from "@/components/elements/loader/loader-products/ProductsLoaderClient";
import { FC } from "react";
import ProductPreviewList from "../../product-preview/product-preview-list/ProductPreviewList";

type ProductsLoaderProps = {
    params?: string;
    limit?: number;
    searchParams: Record<string, any>;
    listType?: keyof ListType;
    className?: string;
    rating?: boolean;
};

const ProductsLoader: FC<ProductsLoaderProps> = async ({
    searchParams,
    limit = 15,
    params,
    listType,
    className,
    rating = false,
}) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set("limit", limit.toString());

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
            children={
                <>
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
                </>
            }
        />
    );
};

export default ProductsLoader;
