interface RatingItem {
	avg: number;
	count: number;
}

export class ProductRatingCacheDTO {
	productId: number;
	rating: RatingItem;
	constructor(param: ProductRatingCacheDTO) {
		this.productId = param.productId;
		this.rating.avg = param.rating.avg;
		this.rating.count = param.rating.count;
	}
}
