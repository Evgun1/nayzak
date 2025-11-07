"use server";
import { appProductsGet } from "@/lib/api/products";
import LoaderProductsClient from "./LoaderProducts.client";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import { ProductPreviewItem } from "@/components/product-preview/ProductPreview.types";
import ProductPreviewDefault from "@/components/product-preview/product-preview-default/ProductsPreviewDefault";
import { FC } from "react";
import getIdByParams from "@/tools/getIdByParams";
export interface ListType {
	five_grid: string;
	four_grid: string;
	three_grid: string;
	two_grid: string;
	list: string;
}

type LoaderProductsParams = {
	showRating?: boolean;
	searchParams?: any;
	params?: string[];
	listType?: keyof ListType;
	className?: string;
};

const LoaderProducts: FC<LoaderProductsParams> = async (props) => {
	const { params, searchParams, listType } = props;

	const urlSearchParams = new URLSearchParams(searchParams);

	const listTypeLimits = new Map([
		["default", "15"],
		[null, "15"],
		["five_grid", "15"],
		["four_grid", "12"],
		["three_grid", "9"],
		["two_grid", "8"],
		["list", "8"],
	]);

	const getListType = !listType
		? urlSearchParams.get("list_type") || "five_grid"
		: urlSearchParams.get("list_type") || listType;

	const getLimit = getListType
		? (listTypeLimits.get(getListType) as string)
		: (listTypeLimits.get(listType || "default") as string);

	urlSearchParams.set("limit", getLimit);

	const category = urlSearchParams.get("category");
	const subcategory = urlSearchParams.get("subcategory");

	if (category) {
		const { id } = getIdByParams(category);
		urlSearchParams.set("categoryId", id.toString());
	}

	if (subcategory) {
		const { id } = getIdByParams(subcategory);
		urlSearchParams.set("subcategoryId", id.toString());
	}

	const fetchProducts = await appProductsGet({
		params,
		searchParams: urlSearchParams,
	});

	const initProductElement = await Promise.all(
		fetchProducts.products.map(async (product, i) => {
			const productParam: ProductPreviewItem = {
				...product,
				Media: {
					src: product.Media[0].src,
					name: product.Media[0].name,
				},
			};

			const bluer = await getPlaceholderImage(productParam.Media.src);
			productParam.Media.blurImage = bluer.placeholder;

			return (
				<li key={product.id}>
					<ProductPreviewDefault
						className={props.className}
						product={productParam}
						showRating={props.showRating}
					/>
				</li>
			);
		}),
	);

	return (
		<LoaderProductsClient
			listType={getListType}
			limit={+getLimit}
			initProductsElement={initProductElement}
			productsParams={params}
			productsCount={fetchProducts.productCounts}
			className={props.className}
			showRating={props.showRating}
		/>
	);
};

export default LoaderProducts;
