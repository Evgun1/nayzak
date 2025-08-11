"use server";
import { ReviewItem } from "@/types/reviews.types";
import PreviewReview from "./PreviewReview";
import Rating from "@/components/rating/Rating";
import { TextClassList } from "@/types/textClassList.enum";
import classes from "./ProductReviews.module.scss";
import ProductReviewsAction from "./ProductReviewsAction";
import { FC } from "react";

type ReviewsProps = {
	reviews: ReviewItem[];
	totalReviews: number;
};

const Reviews: FC<ReviewsProps> = async ({ reviews, totalReviews }) => {
	return (
		<div className={classes["reviews"]}>
			<div className={classes["reviews__header"]}>
				<h5 className={classes["reviews__header-title"]}>
					Customer reviews
				</h5>
				<div className={classes["reviews__header-rating"]}>
					<div className={classes["reviews__rating-wrapper"]}>
						<Rating
							rating={reviews.map(({ rating }) => rating)}
							customClasses={classes["reviews__rating"]}
						/>
						<span
							className={`${TextClassList.REGULAR_12} ${classes["reviews__rating-label"]}`}
						>
							{totalReviews} total Reviews
						</span>
					</div>
					<ProductReviewsAction reviews={reviews} />
				</div>
			</div>
			{reviews.length > 0 && (
				<ul>
					{reviews.map((value, index) => (
						<li key={index}>
							<PreviewReview review={value} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Reviews;
