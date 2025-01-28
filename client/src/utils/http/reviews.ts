import { ReviewItem } from '@/types/reviews.types';
import { appFetchGet } from '.';

export const appReviewsGet = async (id: number) => {
	const pathname = `reviews/${id}`;

	const { totalCount, response } = await appFetchGet<ReviewItem[]>({
		pathname,
	});

	return response;
};

export const appReviewsProductGet = async (params?: string) => {
	const pathname = `reviews/product-reviews/${params
		?.toString()
		.replaceAll('_', ' ')}`;

	const { totalCount, response } = await appFetchGet<ReviewItem[]>({
		pathname,
	});



	return { reviewsData: response, totalReviews: totalCount };
};
