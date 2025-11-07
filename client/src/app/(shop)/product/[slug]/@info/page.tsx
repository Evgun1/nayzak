"use server";
import classes from "./Product.module.scss";
import { appOneProductGet } from "@/lib/api/products";
import Breadcrumbs from "@/ui/breadcrumbs/Breadcrumbs";
import { TextClassList } from "@/types/textClassList.enum";
import Rating from "@/components/rating/Rating";
import Price from "@/components/price/Price";
import ProductActions from "./action/ProductActions";

export default async function Page(props: { params: { slug: string } }) {
	const productFetch = await appOneProductGet({ slug: props.params.slug });

	return (
		<div className={classes["product-info"]}>
			<div className={classes["product-info__header"]}>
				<div className={classes["product-info__info"]}>
					<Breadcrumbs
						className={classes["product-info__info-breadcrumbs"]}
						path="category"
						item={[
							{
								title: productFetch.Categories.title,
								href: `${productFetch.Categories.title.toLowerCase()}-c${
									productFetch.Categories.id
								}`,
							},
							{
								title: productFetch.Subcategories.title,
								href: `${productFetch.Subcategories.title.toLowerCase()}-c${
									productFetch.Subcategories.id
								}`,
							},
							{
								title: productFetch.title,
							},
						]}
					/>
					<h5>{productFetch.title}</h5>
					<p className={TextClassList.REGULAR_14}>
						{productFetch.description}
					</p>
					<div className={classes["product-info__info-rating"]}>
						<Rating rating={productFetch.rating.avg} />
					</div>
				</div>
				<div
					className={`${classes["product-info__price"]} ${TextClassList.SEMIBOLD_26}`}
				>
					<Price
						discount={productFetch.discount}
						price={productFetch.price}
					/>
				</div>
			</div>

			<ProductActions
				className={classes["product-info-action"]}
				productsId={productFetch.id}
			/>
		</div>
	);
}
