import { ProductBase } from "@/types/product/productBase";
import { appFetchGet } from ".";
import { revalidatePath, revalidateTag } from "next/cache";
import { CacheItem } from "./interface/appGetFetch.interface";
import { ProductDetails } from "@/types/product/productDetails";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import getIdByParams from "@/tools/getIdByParams";

type AppProductsGetProps = {
	searchParams?: URLSearchParams;
	params?: string[];
};

type AppProductsPyParamsGetProps = {
	searchParams?: URLSearchParams;
	params: string[];
};

type AppOneProductGetParam = {
	slug: string;
	getCategoryTitle?: boolean;
	getSubcategoryTitle?: boolean;
};

const tag = "products";
export const appProductsGet = async ({
	params,
	searchParams,
}: AppProductsGetProps = {}) => {
	// let pathname = "products";
	let pathnameCatalog = `catalog/products/`;

	// const cache: CacheItem = { revalidate: 1800, tag };
	const cache: CacheItem = { revalidate: 1, tag };

	if (params) {
		const getId = getIdByParams(params).map((item) => item.id);

		pathnameCatalog += `by-params/${getId.join("/")}`;
	}

	const { result, totalCount, headers } = await appFetchGet<ProductBase[]>({
		searchParams,
		pathname: pathnameCatalog,
		cache,
	});

	return { productCounts: totalCount, products: result, headers };
};

export const appNewProductsGet = async () => {
	let pathnameCatalog = `catalog/products/new-products`;
	const { result } = await appFetchGet<ProductBase[]>({
		pathname: pathnameCatalog,
		cache: { request: "no-cache" },
	});

	return { products: result };
};

export const appProductsByParamsGet = async ({
	params,
	searchParams,
}: AppProductsPyParamsGetProps) => {
	let pathname = `products/by-params/${
		Array.isArray(params) ? params.join("/") : params
	}`;
	// const cache: CacheItem = { revalidate: 1800, tag };
	const cache: CacheItem = { revalidate: 1, tag };

	const getId = getIdByParams(params).map((item) => item.id);

	let pathnameCatalog = `catalog/products/by-params/${getId.join("/")}`;
	const { result, totalCount } = await appFetchGet<ProductBase[]>({
		pathname: pathnameCatalog,
		searchParams,
		cache,
	});

	return { productCounts: totalCount, products: result };
};

export const appOneProductGet = async (param: AppOneProductGetParam) => {
	const { slug } = param;
	let pathnameCatalog = `catalog/products/`;

	const productId = getIdByParams(slug);
	pathnameCatalog += `${productId.id}`;

	const { result, totalCount } = await appFetchGet<ProductDetails>({
		pathname: pathnameCatalog,
		cache: { request: "no-cache" },
	});

	return result;
};

export const appMinMaxPriceGet = async (
	searchParams: URLSearchParams,
	slug: string[],
) => {
	let pathnameCatalog = `catalog/products/`;

	const getId = getIdByParams(slug)
		.map((item) => item.id)
		.join("/");

	// const param = Array.isArray(slug) ? slug.join("/") : slug;

	pathnameCatalog += `min-max-price/${getId}`;

	const { result } = await appFetchGet<{
		minPrice: number;
		maxPrice: number;
	}>({
		pathname: pathnameCatalog,
		searchParams,
		cache: { request: "no-cache" },
	});
	return result;
};
