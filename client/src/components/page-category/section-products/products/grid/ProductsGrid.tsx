"use server";

import Toolbar from "./Toolbar";

import classes from "./ProductsGrid.module.scss";
import { useLoadMoreReducer } from "@/hooks/useProductsReducer";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { appProductsGet } from "@/utils/http/products";
import dynamic from "next/dynamic";
import ProductsLoaderServer from "@/components/elements/load-more/loader-products/ProductsLoaderServer";
import { headers } from "next/headers";

export default async function ProductsGrid({
    params,
    searchParams,
}: {
    searchParams: URLSearchParams;
    params?: string;
}) {
    const newSearchParams = searchParams as Record<string, any>;

    const getListType = newSearchParams["list_type"];

    const listTypeLimits = new Map([
        ["default", "15"],
        [null, "15"],
        ["five_grid", "15"],
        ["four_grid", "12"],
        ["three_grid", "9"],
        ["two_grid", "8"],
        ["list", "8"],
    ]);

    const getLimit = getListType
        ? listTypeLimits.get(getListType)
        : listTypeLimits.get("default");

    const { productCounts } = await appProductsGet({
        params: params ? params : undefined,
    });

    return (
        <div className={classes["products-grid"]}>
            <Toolbar totalCount={productCounts} />

            <ProductsLoaderServer
                rating
                className={classes["products-grid__loader"]}
                listType={getListType}
                limit={getLimit ? +getLimit : 15}
                searchParams={searchParams}
                params={params}
            />
        </div>
    );
}
