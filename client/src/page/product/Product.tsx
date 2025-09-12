"use server";

import Price from "../../components/price/Price";
import ProductActions from "./ProductActions";
import Rating from "../../components/rating/Rating";
import { TextClassList } from "@/types/textClassList.enum";
import { ReviewItem } from "@/types/reviews.types";

import classes from "./Product.module.scss";
import { ProductsTabsItem } from "./ProductTabs";
import dynamic from "next/dynamic";
import React, { FC, Fragment, Suspense } from "react";
import { ProductDetails } from "@/types/product/productDetails";
import Breadcrumbs from "@/ui/breadcrumbs/Breadcrumbs";
import Tabs from "@/ui/tabs/Tabs";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import ProductSlider from "./ProductSlider";
import Image from "next/image";

const ProductDescriptionDynamic = dynamic(
	() => import("./product-tab/ProductDescription"),
);
const ProductInfoDynamic = dynamic(() => import("./product-tab/ProductInfo"));
const ProductReviewsDynamic = dynamic(
	() => import("./product-tab/product-reviews/ProductReviews"),
);
const ProductSliderDynamic = dynamic(() => import("./ProductSlider"), {
	ssr: false,
	loading: () => <div className={classes["product-slider__img-main"]}></div>,
});

type ProductProps = {
	reviewsData: {
		totalReviews: number;
		reviewsArray: ReviewItem[];
	};
	productData: ProductDetails;
};
const Product: FC<ProductProps> = async ({ reviewsData, productData }) => {
	const arr: ProductsTabsItem[] = [
		{
			label: "Description",
			children: <ProductDescriptionDynamic productData={productData} />,
		},
		{
			label: "Additional Info",
			children: <ProductInfoDynamic />,
		},
		{
			label: "Reviews",
			children: (
				<ProductReviewsDynamic
					totalReviews={reviewsData.totalReviews}
					reviews={reviewsData.reviewsArray}
				/>
			),
		},
	];

	const media = await Promise.all(
		productData.Media.map(async (media) => {
			const blur = await getPlaceholderImage(media.src);

			return {
				src: media.src,
				name: media.name,
				blurImage: blur.placeholder,
			};
		}),
	);

	return (
		<div>
			<div className={`${classes["product"]}`}>
				<ProductSlider media={media} />
				<div className={classes["product__loop"]}>
					<div className={classes["product__loop-header"]}>
						<div className={classes["product__info"]}>
							<Breadcrumbs
								className={classes["product__info-breadcrumbs"]}
								path="category"
								item={[
									{
										title: productData.Categories.title,
										href: `/${productData.Categories.title.toLowerCase()}-c${
											productData.Categories.id
										}`,
									},
									{
										title: productData.Subcategories.title,
										href: `/${productData.Subcategories.title.toLowerCase()}-c${
											productData.Subcategories.id
										}`,
									},
									{
										title: productData.title,
									},
								]}
							/>
							<h5>{productData.title}</h5>
							<p className={TextClassList.REGULAR_14}>
								{productData.description}
							</p>
							<div className={classes["product__info-rating"]}>
								<Rating
									rating={
										productData.rating
											? +productData.rating
											: 0
									}
								/>
								<span className={TextClassList.REGULAR_12}>
									{reviewsData.totalReviews} Reviews
								</span>
							</div>
						</div>
						<div
							className={`${classes["product__loop-price"]} ${TextClassList.SEMIBOLD_26}`}
						>
							<Price
								discount={productData.discount}
								price={productData.price}
							/>
						</div>
					</div>
					<ProductActions
						className={classes["product__loop-action"]}
						productsId={productData.id}
					/>
				</div>
			</div>

			<Tabs>
				<Tabs.Header>
					{arr.map((val, i) => (
						<Tabs.Toggle
							key={i}
							index={i}
							label={val.label}
						/>
					))}
				</Tabs.Header>
				<Tabs.Body>
					{arr.map((val, i) => (
						<Fragment key={i}>{val.children}</Fragment>
					))}
				</Tabs.Body>
			</Tabs>

			{/* <ProductsTabs data={arr} /> */}
		</div>
	);
};

export default Product;
