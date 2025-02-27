"use server";

import classes from "./ProductGrid.module.scss";

import ProductGridHeader from "./ProductGridHeader";
import ProductsLoader from "@/components/elements/loader/loader-products/ProductsLoader";

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
