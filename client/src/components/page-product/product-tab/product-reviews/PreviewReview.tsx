"use server";

import Rating from "@/components/elements/rating/Rating";
import { ReviewItem } from "@/types/reviews.types";

import classes from "./PreviewReview.module.scss";
import { TextClassList } from "@/types/textClassList.enum";
import Image from "next/image";

type PreviewReviewProps = {
    review: ReviewItem;
};

const PreviewReview = async (props: PreviewReviewProps) => {
    const { review } = props;

    const date = new Date(review.createdAt).toLocaleString("eu-us", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });

    return (
        <div className={classes["review"]}>
            <div className={classes["review__user"]}>
                <div className={classes["review__user-avatar"]}>
                    <Image
                        loading='lazy'
                        fill
                        src={"https://placehold.co/76"}
                        alt='avatar'
                    />
                </div>
                <div>
                    <div className={classes["review__user-header"]}>
                        <span className={`${TextClassList.SEMIBOLD_18}`}>
                            {review.customerName}
                        </span>
                        <span className={TextClassList.REGULAR_14}>{date}</span>
                    </div>
                    <div>
                        <Rating
                            customClasses={classes["review__user-rating"]}
                            rating={review.rating}
                        />
                    </div>
                </div>
            </div>
            <p
                className={`${TextClassList.REGULAR_18} ${classes.reviewCard__paragraph}`}
            >
                {review.text}
            </p>
            <br />
            <div>
                <script>console.log("hello")</script>
            </div>
        </div>
    );
};

export default PreviewReview;
