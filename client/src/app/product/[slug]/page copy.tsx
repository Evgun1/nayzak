"use server";
import "./style.scss";
import { appOneProductGet } from "@/lib/api/products";
import { appReviewsProductGet } from "@/lib/api/reviews";
import { appCustomersGet } from "@/lib/api/customer";
import { ReviewItem } from "@/types/reviews.types";
import Product from "@/page/product/Product";
import { appCategoriesOneGet } from "@/lib/api/categories";
import { appSubcategoriesOneGet } from "@/lib/api/subcategories";
import ClientComponent from "@/components/ClientComponent";
import Link from "next/link";

export default async function Page(props: { params: { slug: string } }) {
	const urlSearchParams = new URLSearchParams();
	// const product = await appOneProductGet(props.params.slug);

	const product = await appOneProductGet({ slug: props.params.slug });

	// const productData = async () => {
	// 	const product = await appOneProductGet({ slug: props.params.slug });
	// };

	// return (
	// 	<div className="wrapper">
	// 		<Product
	// 			productData={product}
	// 			reviewsData={
	// 				{ reviewsArray: [], totalReviews: 0 } /*await reviews()*/
	// 			}
	// 		/>
	// 		<div></div>
	// 	</div>
	// );
	return <div>asd</div>;
}
