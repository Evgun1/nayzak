"use server";

import ProductsLoader from "@/components/elements/load-more/loader-products/ProductsLoader";
import classes from "./ProductGrid.module.scss";

import ProductGridHeader from "./ProductsGridHeader/ProductGridHeader";
import dynamic from "next/dynamic";

const ProductGridHeaderDynamic = dynamic(() => import("./ProductsGridHeader/ProductGridHeader"), {
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
                <ProductsLoader
                    className={classes["product-grid__product"]}
                    listType='four_grid'
                    limit={12}
                    searchParams={searchParams}
                />
            </div>
        </div>
    );
}
