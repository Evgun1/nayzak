"use client";

import classes from "./ProductsLoader.module.scss";
import LoaderButton from "../LoaderButton";
import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { appProductsGet } from "@/lib/api/products";
import ProductPreviewDefault from "@/components/product-preview/product-preview-default/ProductsPreviewDefault";
import { ProductPreviewItem } from "@/components/product-preview/ProductPreview.types";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import Spinner from "@/components/loading/Spinner";
import { useSearchParams } from "next/navigation";
import { ProductBase } from "@/types/product/productBase";
import getIdByParams from "@/tools/getIdByParams";
import ProductPreviewList from "@/components/product-preview/product-preview-list/ProductPreviewList";

type LoaderProductsClientProp = {
	productsParams?: string[];
	limit: number;
	initProductsElement?: ReactNode;
	inputProduct: Array<ProductPreviewItem>;
	productsCount: number;
	listType: string | null;
	showRating?: boolean;
	className?: string;
};

const LoaderProductsClient: FC<LoaderProductsClientProp> = (props) => {
	// const [productsElements, setProductsElements] = useState<JSX.Element[]>([]);
	const searchParams = useSearchParams();

	const [products, setProducts] = useState<ProductBase[]>([]);
	const [productsData, setProductsData] = useState<Array<ProductPreviewItem>>(
		props.inputProduct,
	);
	const [isLoading, setIsLoading] = useState(false);

	async function btnClickHandler() {
		setIsLoading(true);
		const urlSearchParams = new URLSearchParams(searchParams?.toString());

		urlSearchParams.set("offset", productsData.length.toString());
		urlSearchParams.set("limit", props.limit.toString());

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

		const { products: productsFetch } = await appProductsGet({
			searchParams: urlSearchParams,
			params: props.productsParams,
		});
		setProducts(productsFetch);
	}

	const productsElements = useMemo(() => {
		return productsData.map((product, i) => {
			return (
				<li key={i}>
					{props.listType !== "list" ? (
						<ProductPreviewDefault
							className={props.className}
							product={product}
							showRating={props.showRating}
						/>
					) : (
						<ProductPreviewList product={product} />
					)}
				</li>
			);
		});
	}, [productsData, props.className, props.listType, props.showRating]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			try {
				const result = await Promise.all(
					products.map(async (product, i) => {
						const blur = await getPlaceholderImage(
							product.Media[0].src,
						);

						const productParam: ProductPreviewItem = {
							...product,
							Media: {
								src: product.Media[0].src,
								name: product.Media[0].name,
								blurImage: blur.placeholder,
							},
						};

						return productParam;
					}),
				);

				setProductsData((prev) => prev.concat(result));
			} catch (error) {
			} finally {
				setIsLoading(false);
			}
		})();
	}, [products, props.className, props.showRating]);

	console.log(props.productsCount, productsElements.length);

	return (
		<LoaderButton
			className={`${classes["products-loader"]} ${
				props.listType
					? classes[props.listType]
					: props.listType
					? classes[props.listType]
					: ""
			}`}
			totalCount={props.productsCount}
			btnClickHandler={btnClickHandler}
		>
			{/* {props.initProductsElement} */}
			{productsElements}
			{!isLoading ? (
				<></>
			) : (
				<div className={classes["products-loader__spinner-wrapper"]}>
					<Spinner className={classes["products-loader__spinner"]} />
				</div>
			)}
		</LoaderButton>
	);
};
export default LoaderProductsClient;
