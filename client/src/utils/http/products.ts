import { ProductItem } from '@/types/product.types';
import { appFetchGet } from '.';
import { string } from 'zod';

type AppProductsGetProps = {
	searchParams?: URLSearchParams;
	params?: string[];
};

export const appProductsGet = async ({
	params,
	searchParams,
}: AppProductsGetProps = {}) => {
	let pathname = 'products';

	if (params) {
		pathname += `/by-params/${params.join('/')}`;
	}
	if (searchParams) {
		pathname += `?${searchParams}`;
	}

	const { response, totalCount } = await appFetchGet<ProductItem[]>({
		pathname,
	});

	return { productCounts: totalCount, products: response };
};

export const appOneProductGet = async (productsID: number | string) => {
	const pathname = `products/${productsID}`;

	const { response, totalCount } = await appFetchGet<ProductItem>({ pathname });

	return response;
};

export const appMinMaxPriceGet = async (
	searchParams: URLSearchParams,
	slug: string[] | string
) => {
	const param = Array.isArray(slug) ? slug.join('/') : slug;

	const pathname = `products/min-max-price/${param}`;

	const { response } = await appFetchGet<{
		minPrice: number;
		maxPrice: number;
	}>({
		pathname,
		searchParams,
	});
	return response;
};
