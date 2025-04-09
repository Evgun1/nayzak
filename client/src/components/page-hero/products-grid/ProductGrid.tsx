"use server";

import ProductsLoaderServer from "@/components/elements/load-more/loader-products/ProductsLoaderServer";
import classes from "./ProductGrid.module.scss";

import ProductGridHeader from "./ProductGridHeader";
import dynamic from "next/dynamic";

export default async function ProductGrid({
    searchParams,
}: {
    searchParams: Record<string, any>;
}) {
    return (
        <section className='section'>
            <div className='container'>
                <div className={classes["product-grid"]}>
                    <ProductGridHeader searchParams={searchParams} />
                    <ProductsLoaderServer
                        className={classes["product-grid__product"]}
                        listType='four_grid'
                        searchParams={searchParams}
                    />
                </div>
            </div>
        </section>
    );
}
