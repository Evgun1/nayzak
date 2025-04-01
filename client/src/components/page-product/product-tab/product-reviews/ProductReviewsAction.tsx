"use client";

import PopupWriteReview from "@/components/popup-write-reviews/PopupWriteRevires";
import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";
import { popupActions } from "@/lib/redux/store/popup/popup";
import ButtonCustom from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import { ReviewItem } from "@/types/reviews.types";
import { appCookieGet } from "@/utils/http/cookie";
import { FC, useEffect, useState } from "react";

const ProductReviewsAction: FC<{ reviews: ReviewItem[] }> = ({ reviews }) => {
    const customerState = useAppSelector(
        (state) => state.customer.customerData
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
                    (review) => review.customersId === customerState.id
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
