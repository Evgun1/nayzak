"use client";

import classes from "./ProductsLoader.module.scss";

import React, { ReactElement, ReactNode, useCallback, useEffect } from "react";
import LoadMore from "@/components/elements/load-more/LoadMore";
import { useLoadMoreReducer } from "@/hooks/useProductsReducer";
import { appProductsGet } from "@/utils/http/products";
import { useSearchParams } from "next/navigation";
import ProductPreviewList from "@/components/elements/product-preview/product-preview-list/ProductPreviewList";
import ProductPreviewDefault from "../../product-preview/product-preview-default/ProductsPreviewDefault";

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
    children?: ReactNode;
    totalCount?: number;
    className?: string;
    params?: string | string[];
}) => {
    const searchParams = useSearchParams();
    const childrenArr = children as ReactElement[];

    const {
        state,
        loadMore: loadMoreProducts,
        initData,
    } = useLoadMoreReducer(appProductsGet);

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
        loadMoreProducts(+getLimit, +getLimit);
    };

    const initDataHandler = useCallback(() => {
        const urlSearchParams = new URLSearchParams(searchParams.toString());

        if (children) {
            urlSearchParams.set("limit", "0");
            initData({ searchParams: urlSearchParams });
            return;
        }
        urlSearchParams.set(
            "offset",
            `${state.data.length + parseInt(getLimit)}`
        );
        urlSearchParams.set("limit", getLimit.toString());
        initData({ searchParams: urlSearchParams });
    }, [initData, children, searchParams, getLimit, state.data]);

    useEffect(() => {
        initDataHandler();
    }, [initDataHandler]);

    return (
        <LoadMore
            className={`${classes["grid"]} ${
                listType
                    ? classes[listType]
                    : getListType
                    ? classes[getListType]
                    : ""
            }`}
            totalCount={totalCount ? totalCount : state.totalCount}
            btnClickHandler={btnClickHandler}
        >
            {childrenArr &&
                childrenArr.map((child, i) => (
                    <li key={i} className={classes["grid-li"]}>
                        {child}
                    </li>
                ))}

            {state.data.map((product, i) => (
                <li key={i} className={classes["grid-li"]}>
                    {getListType === "list" ? (
                        <ProductPreviewList product={product} rating={rating} />
                    ) : (
                        <ProductPreviewDefault
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
