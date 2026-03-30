import { Observable } from "rxjs";

export interface IReviewServices {
	getAvgRating(data: { product_ids: number[] }): Observable<any>;
	getProductReviews(data: { product_id: number }): Observable<any>;
}
