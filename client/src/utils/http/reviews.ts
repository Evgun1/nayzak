import { ReviewItem, ReviewItemPost } from "@/types/reviews.types";
import { appFetchGet, appFetchPost } from ".";

const tag = "reviews";

export const appReviewsGet = async (id: number) => {
    const pathname = `reviews/${id}`;

    const { totalCount, response } = await appFetchGet<ReviewItem[]>({
        tag,
        pathname,
    });

    return response;
};

export const appReviewsProductGet = async (params: string) => {
    const pathname = `reviews/product-reviews/${params
        ?.toString()
        .replaceAll("_", " ")}`;

    const { totalCount, response } = await appFetchGet<ReviewItem[]>({
        tag,
        pathname,
    });

    return { reviewsData: response, totalReviews: totalCount };
};

export const appReviewsPost = async (sendData: ReviewItemPost) => {
    const pathname = "reviews";

    const { response } = await appFetchPost<ReviewItem>({
        tag,
        pathname,
        sendData,
    });
    return response;
};
