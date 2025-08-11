"use client";

import PopupWriteReview from "@/popups/popup-write-reviews/PopupWriteReviews";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { popupActions } from "@/redux/store/popup/popup";
import { ReviewItem } from "@/types/reviews.types";
import { appCookieGet } from "@/lib/api/cookie";
import { FC, useEffect, useState } from "react";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";

const ProductReviewsAction: FC<{ reviews: ReviewItem[] }> = ({ reviews }) => {
	const customerState = useAppSelector(
		(state) => state.customer.customerData,
	);
	const dispatch = useAppDispatch();

	const [presenceReviewByCustomer, setPresenceReviewByCustomer] =
		useState<boolean>(false);
	const [authCheck, setAuthCheck] = useState<boolean>(false);

	const btnClickHandler = () => {
		if (authCheck) {
			dispatch(popupActions.toggle(<PopupWriteReview />));
		}
	};

	useEffect(() => {
		try {
			if (customerState?.id) {
				const review = reviews.find(
					(review) => review.customersId === customerState.id,
				);

				if (review) setPresenceReviewByCustomer(true);
			}
		} catch (error) {
			console.log(error);
		}
	}, [reviews, customerState]);

	useEffect(() => {
		(async () => {
			const token = await appCookieGet("user-token");

			if (token) setAuthCheck(true);
		})();
	}, []);
	return (
		<div>
			{!presenceReviewByCustomer && (
				<ButtonCustom
					styleSettings={{
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
			)}
		</div>
	);
};

export default ProductReviewsAction;
