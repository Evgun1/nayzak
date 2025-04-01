"use server";

import ProductsLoaderServer from "@/components/elements/load-more/loader-products/ProductsLoaderServer";
import classes from "./ProductGrid.module.scss";

import ProductGridHeader from "./ProductGridHeader";
import dynamic from "next/dynamic";
import ProductsLoaderClient from "@/components/elements/load-more/loader-products/ProductsLoaderClient";

const ProductGridHeaderDynamic = dynamic(() => import("./ProductGridHeader"), {
    ssr: false,

    loading: () => (
        <div className={classes["product-grid__header"]}>
            <div className={classes["loading"]}>
                <div className={classes["loading__spinner"]}></div>
            </div>
        </div>
    ),
});

export default async function ProductGrid({
    searchParams,
}: {
    searchParams: Record<string, any>;
}) {
    return (
        <div className='container'>
            <div className={classes["product-grid"]}>
                <ProductGridHeader />
                <ProductsLoaderServer
                    className={classes["product-grid__product"]}
                    listType='four_grid'
                    searchParams={searchParams}
                />
            </div>
        </div>
    );
}
