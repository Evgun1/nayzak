import { CategoryItem } from "@/types/categories.types";
import { appFetchGet } from ".";
import { CacheItem } from "./interface/appGetFetch.interface";
import { ICategory } from "@/types/category/category.interface";
import getIdByParams from "@/tools/getIdByParams";

const tag = "categories";

export const appCategoriesGet = async (searchParams?: URLSearchParams) => {
	// const pathname = "categories";
	let pathnameCatalog = "catalog/categories";
	const cache: CacheItem = { tag: tag, revalidate: 1800 };

	const { result, totalCount } = await appFetchGet<ICategory[]>({
		pathname: pathnameCatalog,
		searchParams,
		cache,
	});

	return result;
};

export const appCategoriesOneGet = async (params: { slug: string }) => {
	// const pathname = `categories/${categoryParam}`;

	const getId = getIdByParams(params.slug);

	let pathnameCatalog = `catalog/categories/${getId.id}`;
	const cache: CacheItem = { tag: tag, revalidate: 1800 };

	const { result, totalCount } = await appFetchGet<ICategory>({
		pathname: pathnameCatalog,
		cache,
	});

	return result;
};
