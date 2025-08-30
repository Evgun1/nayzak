"use server";
import classes from "./Product.module.scss";
import { appOneProductGet } from "@/lib/api/products";
import { appReviewsProductGet } from "@/lib/api/reviews";
import { appCustomersGet } from "@/lib/api/customer";
import { ReviewItem } from "@/types/reviews.types";
import Product from "@/page/product/Product";
import { appCategoriesOneGet } from "@/lib/api/categories";
import { appSubcategoriesOneGet } from "@/lib/api/subcategories";
import ClientComponent from "@/components/ClientComponent";
import Link from "next/link";
import Breadcrumbs from "@/ui/breadcrumbs/Breadcrumbs";
import { TextClassList } from "@/types/textClassList.enum";
import Rating from "@/components/rating/Rating";
import Price from "@/components/price/Price";
import ProductActions from "./ProductActions";

export default async function Page(props: { params: { slug: string } }) {
	const productData = await appOneProductGet({ slug: props.params.slug });

	return (
		<div className={classes["product-info"]}>
			<div className={classes["product-info__header"]}>
				<div className={classes["product-info__info"]}>
					<Breadcrumbs
						className={classes["product-info__info-breadcrumbs"]}
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
					<div className={classes["product-info__info-rating"]}>
						<Rating
							rating={
								productData.rating ? +productData.rating : 0
							}
						/>
						{/* <span className={TextClassList.REGULAR_12}>
							{reviewsData.totalReviews} Reviews
						</span> */}
					</div>
				</div>
				<div
					className={`${classes["product-info__price"]} ${TextClassList.SEMIBOLD_26}`}
				>
					<Price
						discount={productData.discount}
						price={productData.price}
					/>
				</div>
			</div>
			<ProductActions
				className={classes["product-info-action"]}
				productsId={productData.id}
			/>
		</div>
	);
}
