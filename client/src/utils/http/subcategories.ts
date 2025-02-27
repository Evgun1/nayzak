import { appFetchGet } from '.';
import { SubcategoryItem } from '@/types/subcategories.types';

export const appSubcategoriesGet = async (searchParams?: URLSearchParams) => {
	const pathname = 'subcategories';

	const { response } = await appFetchGet<SubcategoryItem[]>({
		pathname,
		searchParams,
	});

	return response;
};

export const appSubcategoriesOneGet = async (
	subcategoriesId: number | string
) => {
	const pathname = `subcategories/${subcategoriesId}`;

	const { response } = await appFetchGet<SubcategoryItem>({
		pathname,
	});

	return response;
};

export const appSubcategoryByCategoryGet = async (params: string) => {
	const pathname = `subcategories/category/${
		params[0].toUpperCase() + params.slice(1)
	}`;

	const { response } = await appFetchGet<SubcategoryItem[]>({
		pathname,
	});

	return response;
};
