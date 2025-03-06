import { AllPriceItem, ProductItem } from "../types/product.types";
import { Reducer, useCallback, useReducer, useState } from "react";
import { useSearchParams } from "next/navigation";
import { appProductsGet } from "@/utils/http/products";

export type fetchProductsProps = {
    urlSearchParams?: URLSearchParams;
    params?: string[];
};

enum ProductsActionType {
    INIT,
    START_LOAD,
    LOAD_MORE,
    END_LOAD,
}

type ProductsAction = {
    type: ProductsActionType;
    payload?: ProductsState | null;
};

interface ProductsState {
    products: ProductItem[];
    totalCount: number;
    isLoading: boolean;
    // loaderFn: () => Promise<unknown> | null;
}

type FetchType<T, P = void> = (params?: P) => Promise<T>;

const productsReducer: Reducer<ProductsState, ProductsAction> = (
    state,
    action
) => {
    switch (action.type) {
        case ProductsActionType.INIT:
            return { ...action.payload };
        case ProductsActionType.START_LOAD:
            return { ...state, isLoading: true };
        case ProductsActionType.LOAD_MORE:
            const newState: ProductsState = {
                ...action.payload,
                products: state.products.concat(action.payload?.products ?? []),
            };
            return newState;
        case ProductsActionType.END_LOAD:
            return { ...state, isLoading: false };
        default:
            return state;
    }
};

export const useProductsReducer = <T extends { [key: string]: any }, P>(
    loaderFn: FetchType<T, P>
) => {
    const [state, dispatch] = useReducer(productsReducer, {
        products: [],
        totalCount: 0,
        isLoading: false,
    });

    const searchParams = useSearchParams();

    const initData = useCallback(
        async (params?: P) => {
            const result = await loaderFn(params);
            const arrayKey = Object.keys(result).find((key) =>
                Array.isArray(result[key])
            );
            const countKey = Object.keys(result).find(
                (key) => typeof result[key] === "number"
            );

            if (arrayKey && countKey) {
                dispatch({
                    type: ProductsActionType.INIT,
                    payload: {
                        products: result[arrayKey],
                        totalCount: result[countKey],
                        isLoading: false,
                    },
                });
            }
        },
        [loaderFn]
    );

    const loadMoreProducts = async (
        offset: number,
        limit: number = 8,
        params?: string | string[]
    ) => {
        dispatch({ type: ProductsActionType.START_LOAD });
        try {
            const requestParams = new URLSearchParams(searchParams.toString());

            requestParams.set("offset", offset.toString());
            requestParams.set("limit", limit.toString());

            const result = await loaderFn({
                searchParams: requestParams,
                params,
            } as P);

            const payload: ProductsState = {
                isLoading: false,
                products: result.products,
                totalCount: result.productCounts,
            };

            dispatch({ type: ProductsActionType.LOAD_MORE, payload });
        } catch (error) {
        } finally {
            dispatch({ type: ProductsActionType.END_LOAD });
        }
    };

    return { state, loadMoreProducts, initData };
};
