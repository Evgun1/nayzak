export type TProductRatingCache = { avg: number; count: number };
export type UploadCacheProductRatingParam = {
	productId: number;
	rating: TProductRatingCache;
};
