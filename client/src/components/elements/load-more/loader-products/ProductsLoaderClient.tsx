"use client";

import classes from "./ProductsLoader.module.scss";

import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import LoadMore from "@/components/elements/load-more/LoadMore";
import { useProductsReducer } from "@/hooks/useProductsReducer";
import { appProductsGet } from "@/utils/http/products";
import { useSearchParams } from "next/navigation";
import ProductPreviewDefaultClient from "@/components/elements/product-preview/product-preview-default/ProductsPreviewDefaultClient";
import ProductPreviewList from "@/components/elements/product-preview/product-preview-list/ProductPreviewList";

export interface ListType {
    five_grid: string;
    four_grid: string;
    three_grid: string;
    two_grid: string;
    list: string;
}

const ProductsLoaderClient = ({
    children,
    totalCount,
    listType = "five_grid",
    params,
    className,
    rating = false,
}: {
    rating?: boolean;
    listType?: keyof ListType;
    children: ReactNode;
    totalCount: number;
    className?: string;
    params?: string | string[];
}) => {
    const searchParams = useSearchParams();
    const childrenArr = children as ReactElement[];

    const { state, loadMoreProducts, initData } =
        useProductsReducer(appProductsGet);

    const listTypeLimits = new Map([
        ["default", "15"],
        [null, "15"],
        ["five_grid", "15"],
        ["four_grid", "12"],
        ["three_grid", "9"],
        ["two_grid", "8"],
        ["list", "8"],
    ]);
    const newSearchParams = searchParams as Record<string, any>;

    const getListType = newSearchParams.get("list_type");

    const getLimit = getListType
        ? (listTypeLimits.get(getListType) as string)
        : (listTypeLimits.get(listType) as string);

    const btnClickHandler = () => {
        loadMoreProducts(state.products.length + +getLimit, +getLimit, params);
    };

    return (
        <LoadMore
            style={`${classes["grid"]} ${
                listType
                    ? classes[listType]
                    : getListType
                    ? classes[getListType]
                    : ""
            }`}
            totalCount={totalCount}
            btnClickHandler={btnClickHandler}
        >
            {childrenArr.map((child, i) => (
                <li key={i} className={classes["grid-li"]}>
                    {child}
                </li>
            ))}

            {state.products.map((product, i) => (
                <li key={i} className={classes["grid-li"]}>
                    {getListType === "list" ? (
                        <ProductPreviewList product={product} rating={rating} />
                    ) : (
                        <ProductPreviewDefaultClient
                            className={className}
                            rating={rating}
                            product={product}
                        />
                    )}
                </li>
            ))}
        </LoadMore>
    );
};

export default ProductsLoaderClient;
