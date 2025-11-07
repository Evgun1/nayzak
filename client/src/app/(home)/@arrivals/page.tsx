"use server";
import ProductPreviewDefault from "@/components/product-preview/product-preview-default/ProductsPreviewDefault";
import classes from "./LatestArrivals.module.scss";

import { appNewProductsGet } from "@/lib/api/products";

import { ProductPreviewItem } from "@/components/product-preview/ProductPreview.types";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import SwiperComponent from "./swiper/Swiper";
import { FC } from "react";

const Page: FC = async () => {


	const productFetch = await appNewProductsGet();
	const products: ProductPreviewItem[] = [];
	for (const element of productFetch.products) {
		const {
			createdAt,
			discount,
			id,
			price,
			rating,
			title,
			Media,
			description,
		} = element;

		const blur = await getPlaceholderImage(Media[0].src);
		products.push({
			createdAt,
			discount,
			id,
			price,
			rating,
			title,
			description,
			Media: {
				src: Media[0].src,
				name: Media[0].name,
				blurImage: blur.placeholder,
			},
		});
	}

	return (
		<div className={classes["products-swiper"]}>
			<SwiperComponent label="Latest Arrivals">
				{
					products.length > 0 &&
					products.map((product, i) => (
						<ProductPreviewDefault
							key={i}
							showIcon
							className={classes["products-swiper__product"]}
							product={product}
						/>
					))}
			</SwiperComponent>
		</div>
	);
};

export default Page;
