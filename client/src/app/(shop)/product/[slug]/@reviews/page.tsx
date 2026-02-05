"use server";
import { FC } from "react";
import ReviewHeader from "./review-header/ReviewHeader";
import { appReviewsProductGet } from "@/lib/api/reviews";
import ReviewPreview from "./review-preview/ReviewPreview";
import Loading from "./loading";
type PageProps = {
	params: Promise<{ slug: string }>;
};

function SlowContent(reviews: { reviewsData: any[]; totalReviews: any }) {
	return new Promise<JSX.Element>((resolve) => {
		setTimeout(() => {
			resolve(
				<div>
					<ReviewHeader
						reviews={reviews.reviewsData}
						reviewsCount={reviews.totalReviews}
					/>
					{reviews.reviewsData &&
						reviews.reviewsData.length > 0 &&
						reviews.reviewsData.map((review, i) => (
							<ReviewPreview
								key={i}
								review={review}
							/>
						))}
				</div>,
			);
		}, 3000);
	});
}

const Page: FC<PageProps> = async (props) => {
	const slug = (await props.params).slug;
	const reviews = await appReviewsProductGet(
        slug);

	return (
		<div>
			<ReviewHeader
				reviews={reviews.reviewsData}
				reviewsCount={reviews.totalReviews}
			/>
			{reviews.reviewsData &&
				reviews.reviewsData.length > 0 &&
				reviews.reviewsData.map((review, i) => (
					<ReviewPreview
						key={i}
						review={review}
					/>
				))}
		</div>
	);
};

export default Page;
