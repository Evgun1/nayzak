"use server";

import Loader from "@/components/elements/loader/Loader";
import { ProductItem } from "@/types/product.types";
import { appProductsGet } from "@/utils/http/products";
import { headers } from "next/headers";

import classes from "./ProductsLoader.module.scss";
import ProductPreviewDefault from "@/components/elements/product-preview/product-preview-default/ProductsPreviewDefault";
import ProductsLoaderClient from "../../../elements/loader/loader-products/ProductsLoaderClient";

const ProductsLoaderT = async () => {
    const header = headers();
    const url = header.get("referer");
    const newUrl = new URL(url ? url : "");
    const searchParams = newUrl.search.replaceAll("?", "");
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set("limit", "8");
    const { products, productCounts } = await appProductsGet({
        searchParams: urlSearchParams,
    });

    return (
        <ProductsLoaderClient
            totalCount={productCounts}
            children={
                <>
                    {products.map((product, i) => {
                        return (
                            <ProductPreviewDefault  key={i} product={product} />
                        );
                    })}
                </>
            }
        />
    );
};

export default ProductsLoaderT;
