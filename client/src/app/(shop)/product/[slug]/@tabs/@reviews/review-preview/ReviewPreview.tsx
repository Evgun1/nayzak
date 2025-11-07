"use server";

import Rating from "@/components/rating/Rating";
import { ReviewItem } from "@/types/reviews.types";

import classes from "./ReviewPreview.module.scss";
import { TextClassList } from "@/types/textClassList.enum";
import Image from "next/image";
import { FC } from "react";

type PreviewReviewProps = {
	review: ReviewItem;
};

const ReviewPreview: FC<PreviewReviewProps> = async (props) => {
	const { review } = props;

	const date = new Date(review.createdAt).toLocaleDateString("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
	});

	return (
		<div className={classes["review-preview"]}>
			<div className={classes["review-preview__header"]}>
				<div className={classes["review-preview__header-avatar"]}>
					<Image
						loading="lazy"
						fill
						src={"https://placehold.co/76"}
						alt="avatar"
					/>
				</div>
				<div className={classes["review-preview__user"]}>
					<div className={TextClassList.SEMIBOLD_18}>
						{review.fullName}
					</div>
					<div
						className={`${TextClassList.REGULAR_14} ${classes["review-preview__user-date"]}`}
					>
						{date}
					</div>
					<Rating
						customClasses={classes["review-preview__user-rating"]}
						rating={review.rating}
					/>
				</div>
			</div>
			<div
				className={`${TextClassList.REGULAR_18} ${classes["review-preview__text"]}`}
			>
				{review.text}
			</div>
		</div>
	);
};

export default ReviewPreview;
