import { ProductBase } from "@/types/product/productBase";
import { appFetchGet } from ".";
import { revalidatePath, revalidateTag } from "next/cache";
import { CacheItem } from "./interface/appGetFetch.interface";
import { ProductDetails } from "@/types/product/productDetails";
import { getPlaceholderImage } from "@/utils/getPlaceholderImage";

type AppProductsGetProps = {
	searchParams?: URLSearchParams;
	params?: string[] | string | number[] | number;
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
		pathnameCatalog += `/by-params/${
			Array.isArray(params) ? params.join("/") : params
		}`;
	}

	const { result, totalCount, headers } = await appFetchGet<ProductBase[]>({
		searchParams,
		pathname: pathnameCatalog,
		cache,
	});

	return { productCounts: totalCount, products: result, headers };
};

type AppProductsPyParamsGetProps = {
	searchParams?: URLSearchParams;
	params: string[] | string;
};

interface NewProductItem {
	id: number;
	src: string;
	title: string;
	price: number;
	discount: number;
	createdAt: Date;
}

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

	let pathnameCatalog = `catalog/products/by-params/${
		Array.isArray(params) ? params.map((data) => +data).join("/") : params
	}`;

	const { result, totalCount } = await appFetchGet<ProductBase[]>({
		pathname: pathnameCatalog,
		searchParams,
		cache,
	});

	return { productCounts: totalCount, products: result };
};

type AppOneProductGetParam = {
	slug: string;
	getCategoryTitle?: boolean;
	getSubcategoryTitle?: boolean;
};

export const appOneProductGet = async (param: AppOneProductGetParam) => {
	const { slug } = param;

	let pathnameCatalog = `catalog/products/`;
	// const cache: CacheItem = { revalidate: 1800, tag };
	// const cache: CacheItem = { revalidate: 1, tag };

	const slugArr = slug.split("-");
	const slugIndex = slugArr.findIndex(
		(val) => !Number.isNaN(+val.replaceAll("p", "")),
	);

	const productId = +slugArr[slugIndex].replaceAll("p", "");
	pathnameCatalog += `${productId}`;

	const { result, totalCount } = await appFetchGet<ProductDetails>({
		pathname: pathnameCatalog,
		cache: { request: "no-cache" },
	});

	return result;
};

export const appMinMaxPriceGet = async (
	searchParams: URLSearchParams,
	slug: string[] | string | number | number[],
) => {
	const param = Array.isArray(slug) ? slug.join("/") : slug;
	let pathnameCatalog = `catalog/products/`;

	pathnameCatalog += `min-max-price/${param}`;

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
