"use server";

import dynamic from "next/dynamic";
import classes from "./ProductGrid.module.scss";

import ProductGridHeader from "./ProductGridHeader";
import ProductsLoader from "@/components/elements/load-more/loader-products/ProductsLoader";

export default async function ProductGrid({
    searchParams,
}: {
    searchParams: Record<string, any>;
}) {
    const ProductGridHeaderDynamic = dynamic(
        () => import("./ProductGridHeader"),
        {
            ssr: false,
            loading: () => (
                <div className={classes["product-grid__header"]}>
                    <div className={classes["loading"]}>
                        <span className={classes["loading__spinner"]}></span>
                    </div>
                </div>
            ),
        }
    );

    return (
        <div className='container'>
            <div className={classes["product-grid"]}>
                <ProductGridHeaderDynamic searchParams={searchParams} />
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
