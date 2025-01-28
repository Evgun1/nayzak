import { AllPriceItem, ProductItem } from '../types/product.types';
import { Reducer, useCallback, useReducer } from 'react';
import { useSearchParams } from 'next/navigation';
import { appProductsGet } from '@/utils/http/products';

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
				products: state.products.concat(action.payload?.products),
			};
			return newState;
		case ProductsActionType.END_LOAD:
			return { ...state, isLoading: false };
		default:
			return state;
	}
};

export const useProductsReducer = () => {
	const [state, dispatch] = useReducer(productsReducer, {
		products: [],
		totalCount: 0,
		isLoading: false,
	});

	const searchParams = useSearchParams();

	const initData = useCallback(
		async <T extends { [key: string]: any }, P>(
			fetch: FetchType<T, P>,
			params?: P
		) => {
			const result = await fetch(params);

			const arrayKey = Object.keys(result).find((key) =>
				Array.isArray(result[key])
			);
			const countKey = Object.keys(result).find(
				(key) => typeof result[key] === 'number'
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
		[]
	);

	// dispatch({
	//   type: ProductsActionType.INIT,
	//   payload: {
	//     isLoading: false,
	//     products: result.products,
	//     totalCount: result.productCounts,
	//   },
	// });

	// useEffect(() => {
	//   dispatch({ type: ProductsActionType.START_LOAD });

	//   // appProductsGet({ searchParams }).then((result) => {
	//   //   dispatch({
	//   //     type: ProductsActionType.INIT,
	//   //     payload: {
	//   //       isLoading: false,
	//   //       products: result.products,
	//   //       totalCount: result.productCounts,
	//   //     },
	//   //   });
	//   // });

	//   initData(searchParams);
	// }, [searchParams]);

	const loadMoreProducts = async (offset: number, limit: number = 8) => {
		dispatch({ type: ProductsActionType.START_LOAD });
		try {
			const requestParams = new URLSearchParams(searchParams.toString());

			requestParams.set('offset', offset.toString());
			requestParams.set('limit', limit.toString());

			const result = await appProductsGet({ searchParams: requestParams });

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
