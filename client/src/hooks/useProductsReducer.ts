"use client";

import { Reducer, useCallback, useReducer } from "react";
import { useSearchParams } from "next/navigation";
import { ProductBase } from "@/types/product/productBase";

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
	fullData: ProductBase[];
	lastData: ProductBase;
	totalCount: number;
	isLoading: boolean;
	// loaderFn: () => Promise<unknown> | null;
}

type FetchType<T, P = void> = (params?: P) => Promise<T>;

const productsReducer: Reducer<ProductsState, ProductsAction> = (
	state,
	action,
) => {
	switch (action.type) {
		case ProductsActionType.INIT:
			return {
				...state,
				...action.payload,
				fullData: action.payload?.fullData ?? [],
			};
		case ProductsActionType.START_LOAD:
			return { ...state, isLoading: true };
		case ProductsActionType.LOAD_MORE:
			const newState: ProductsState = {
				isLoading: action.payload?.isLoading || true,
				totalCount: action.payload?.totalCount
					? action.payload?.totalCount
					: 0,
				fullData: [
					...state.fullData,
					...(action.payload?.fullData ?? []),
				],
				lastData: action.payload?.lastData ?? ({} as ProductBase),
			};

			return newState;
		case ProductsActionType.END_LOAD:
			return { ...state, isLoading: false };
		default:
			return state;
	}
};

export const useLoadMoreReducer = <T extends { [key: string]: any }, P>(
	loaderFn: FetchType<T, P>,
	init?: { data: any[]; totalCount: number },
) => {
	const [state, dispatch] = useReducer(productsReducer, {
		fullData: init ? init.data : [],
		lastData: {} as ProductBase,
		totalCount: init ? init.totalCount : 0,
		isLoading: false,
	});

	const searchParams = useSearchParams();

	const initData = useCallback(
		async (params?: P) => {
			const result = await loaderFn(params);
			const arrayKey = Object.keys(result).find((key) =>
				Array.isArray(result[key]),
			);
			const countKey = Object.keys(result).find(
				(key) => typeof result[key] === "number",
			);

			if (arrayKey && countKey) {
				dispatch({
					type: ProductsActionType.INIT,
					payload: {
						lastData: result[arrayKey],
						fullData: result[arrayKey],
						totalCount: result[countKey],
						isLoading: false,
					},
				});
			}
		},
		[dispatch, loaderFn],
	);

	const loadMore = async (
		offset: number,
		limit: number = 8,
		params?: string | string[],
	) => {
		dispatch({ type: ProductsActionType.START_LOAD });
		try {
			const requestParams = new URLSearchParams(searchParams?.toString());

			requestParams.set("offset", offset.toString());
			requestParams.set("limit", limit.toString());

			const result = await loaderFn({
				searchParams: requestParams,
				params,
			} as P);

			const payload = {
				isLoading: false,
			} as ProductsState;

			for (const key in result) {
				if (typeof result[key] === "object")
					payload.fullData = result[key];
				payload.lastData = result[key];
				if (typeof result[key] === "number") {
					payload.totalCount = result[key];
				}
			}

			dispatch({ type: ProductsActionType.LOAD_MORE, payload });
		} catch (error) {
		} finally {
			dispatch({ type: ProductsActionType.END_LOAD });
		}
	};

	return { state, loadMore, initData };
};
