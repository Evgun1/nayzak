import { appFetchGet } from ".";
import { ISubcategory } from "@/types/subcategories.interface";
import { CacheItem } from "./interface/appGetFetch.interface";
import { log } from "console";

const tag = "subcategories";

// let pathname = "subcategories";

export const appSubcategoriesGet = async (
	searchParams?: URLSearchParams | string,
) => {
	let pathnameCatalog = "catalog/subcategories";
	const cache: CacheItem = {
		tag,
		revalidate: 1800,
	};

	console.log(searchParams?.toString());

	const { result } = await appFetchGet<ISubcategory[]>({
		pathname: pathnameCatalog,
		searchParams,
		cache,
	});

	return result;
};

export const appSubcategoriesOneGet = async (
	subcategoriesId: number | string,
) => {
	// const pathname = `subcategories/${subcategoriesId}`;
	let pathnameCatalog = `catalog/subcategories/${subcategoriesId}`;
	const cache: CacheItem = {
		tag,
		revalidate: 1800,
	};
	const { result } = await appFetchGet<ISubcategory>({
		cache,
		pathname: pathnameCatalog,
	});

	return result;
};

export const appSubcategoryByCategoryGet = async (id: number) => {
	// const pathname = `subcategories/category/${
	// 	params[0].toUpperCase() + params.slice(1)
	// }`;
	const cache: CacheItem = {
		tag,
		revalidate: 1800,
	};
	let pathnameCatalog = `catalog/subcategories/category/${id}`;

	const { result } = await appFetchGet<ISubcategory[]>({
		pathname: pathnameCatalog,
		cache,
	});

	return result;
};
