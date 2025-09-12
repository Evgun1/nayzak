"use client";

import Rating from "@/components/rating/Rating";
import classes from "./ReviewHeader.module.scss";
import { appCookieGet } from "@/lib/api/cookie";
import PopupWriteReview from "@/popups/popup-write-reviews/PopupWriteReviews";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { popupActions } from "@/redux/store/popup/popup";
import { ReviewItem } from "@/types/reviews.types";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { FC, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { TextClassList } from "@/types/textClassList.enum";

type ReviewHeaderParam = {
	reviews: ReviewItem[];
	reviewsCount: number;
};

const ReviewHeader: FC<ReviewHeaderParam> = (props) => {
	const { reviews } = props;
	const dispatch = useAppDispatch();
	const customerState = useAppSelector(
		(state) => state.customer.customerData,
	);
	const [authCheck, setAuthCheck] = useState<boolean>(false);
	const [presenceReviewByCustomer, setPresenceReviewByCustomer] =
		useState<boolean>(false);

	const btnClickHandler = () => {
		if (authCheck) dispatch(popupActions.toggle(<PopupWriteReview />));
	};

	useLayoutEffect(() => {
		try {
			(async () => {
				if (!customerState?.id) return;
				const review = reviews.find(
					(review) => review.customersId === customerState.id,
				);
				if (review) setPresenceReviewByCustomer(true);
				setAuthCheck(true);
			})();
		} catch (error) {}
	}, [reviews, customerState]);

	return (
		<div className={classes["review-header"]}>
			<h5 className={classes["review-header__title"]}>
				Customer reviews
			</h5>
			<div className={classes["review-header__rating"]}>
				<Rating
					rating={props.reviews.map((item) => item.rating) ?? 0}
				/>
				<span
					className={`${TextClassList.REGULAR_12} ${classes["review-header__rating-label"]}`}
				>
					{props.reviewsCount} total Reviews
				</span>
			</div>

			<ButtonCustom
				styleSettings={{
					state: [presenceReviewByCustomer ? "DISABLE" : "HOVER"],
					type: "DEFAULT",
					color: "DARK",
					size: "SMALL",
					fill: "OUTLINE",
					roundness: "SHARP",
				}}
				onClick={btnClickHandler}
			>
				Write reviews
			</ButtonCustom>
		</div>
	);
};

export default ReviewHeader;
