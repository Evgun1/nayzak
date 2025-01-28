import { CategoryItem } from '@/types/categories.types';
import { appFetchGet } from '.';

export const appCategoriesGet = async (searchParams?: URLSearchParams) => {
	const pathname = 'categories';

	const { response, totalCount } = await appFetchGet<CategoryItem[]>({
		pathname,
		searchParams,
	});

	return response;
};

export const appCategoriesOneGet = async (categoryId: number | string) => {
	const pathname = `categories/${categoryId}`;

	const { response, totalCount } = await appFetchGet<CategoryItem>({
		pathname,
	});

	return response;
};
