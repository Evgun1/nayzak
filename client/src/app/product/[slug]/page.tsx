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

	const productData = async () => {
		const product = await appOneProductGet({ slug: props.params.slug });

		// const category = await appCategoriesOneGet(product.categoriesId);
		// const subcategory = await appSubcategoriesOneGet(
		// 	product.subcategoriesId,
		// );

		// return Object.assign(product, {
		// 	category: category.title,
		// 	subcategory: subcategory.title,
		// });
	};

	// const reviews = async () => {
	// 	const { reviewsData, totalReviews } = await appReviewsProductGet(
	// 		(
	// 			await productData()
	// 		).id,
	// 	);
	// 	const customers = await appCustomersGet(urlSearchParams);
	// 	const customersId = reviewsData
	// 		.map((review) => review.customersId)
	// 		.join(",");
	// 	urlSearchParams.set("id", customersId);

	// 	const reviews: ReviewItem[] = reviewsData.map((review) => {
	// 		const index = customers.findIndex((customer) => {
	// 			return review.customersId === customer.id;
	// 		});
	// 		const newReview = { ...review };
	// 		if (index !== -1) {
	// 			newReview.customerName = `${customers[index].firstName} ${customers[index].lastName}`;
	// 		}

	// 		return newReview;
	// 	});

	// 	return { reviewsArray: reviews, totalReviews };
	// };

	return (
		<div className="wrapper">
			<Product
				productData={product}
				reviewsData={
					{ reviewsArray: [], totalReviews: 0 } /*await reviews()*/
				}
			/>

			{/* {product ? (
				<>
					<ProductLoop
						productData={product}
						reviewsArray={newReviews}
						totalReviews={totalReviews}
					/>
					<ProductTabs
						productData={product}
						reviewArray={newReviews}
						totalReviews={totalReviews}
					/>
				</>
			) : (
				<div>Product not Found</div>
			)} */}
		</div>
	);
}
