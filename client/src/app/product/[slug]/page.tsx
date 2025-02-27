'use server';
import './style.scss';
import { appOneProductGet } from '@/utils/http/products';
import { appReviewsProductGet } from '@/utils/http/reviews';
import { appCustomersGet } from '@/utils/http/customer';
import { ReviewItem } from '@/types/reviews.types';
import Product from '@/components/page-product/Product';

export default async function page(props: { params: { slug: string } }) {
	const urlSearchParams = new URLSearchParams();
	const product = await appOneProductGet(props.params.slug);
	const { reviewsData, totalReviews } = await appReviewsProductGet(
		props.params.slug
	);

	const customersId = reviewsData.map((review) => review.customersId).join(',');

	urlSearchParams.set('id', customersId);
	const customers = await appCustomersGet(urlSearchParams);

	const newReviews: ReviewItem[] = reviewsData.map((review) => {
		const index = customers.findIndex((customer) => {
			return review.customersId === customer.id;
		});
		const newReview = { ...review };
		if (index !== -1) {
			newReview.customerName = `${customers[index].firstName} ${customers[index].lastName}`;
		}

		return newReview;
	});

	return (
		<div className="wrapper">
			<Product
				productData={product}
				reviewsArray={newReviews}
				totalReviews={totalReviews}
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
