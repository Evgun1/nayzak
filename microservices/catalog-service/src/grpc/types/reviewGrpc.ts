import { buffer } from "stream/consumers";
import { Observable } from "rxjs";

export type GetAvgRatingRequest = {
	productIds: number[];
};

interface GetAvgRatingItem {
	productId: number;
	avgRating: number;
}

export type GetAvgRatingResponse = {
	items: GetAvgRatingItem[];
	count: number;
};

export type GetProductReviewsRequest = {
	productId: number;
};

interface ReviewItem {
	fullName: string;
	createdAt: Date;
	text: string;
	rating: number;
	image: Buffer;
}

export type GetProductReviewsResponse = {
	reviews: ReviewItem[];
	avgRating: number;
	total_count: number;
};

export interface ReviewGrpc {
	getAvgRating(data: GetAvgRatingRequest): Observable<GetAvgRatingResponse>;
	getProductReviews(
		data: GetProductReviewsRequest,
	): Observable<GetProductReviewsResponse>;
}
