import { ReviewItem, ReviewItemPost } from "@/types/reviews.types";
import { appFetchGet, appFetchPost } from ".";
import { CacheItem } from "./interface/appGetFetch.interface";

const tag = "reviews";

export const appReviewsGet = async (id: number) => {
	const pathname = `review/${id}`;
	const cache: CacheItem = { tag, revalidate: 1800 };

	const { totalCount, result } = await appFetchGet<ReviewItem[]>({
		pathname,
		cache,
	});

	return result;
};

export const appReviewsProductGet = async (params: string | number) => {
	const pathname = `review/product-reviews/${params
		?.toString()
		.replaceAll("_", " ")}`;
	const cache: CacheItem = { tag, revalidate: 1800 };

	const { totalCount, result } = await appFetchGet<ReviewItem[]>({
		pathname,
		cache,
	});

	return { reviewsData: result, totalReviews: totalCount };
};

export const appReviewsPost = async (sendData: ReviewItemPost) => {
	const pathname = "review";

	const { result } = await appFetchPost<ReviewItem>({
		pathname,
		sendData,
	});
	return result;
};
