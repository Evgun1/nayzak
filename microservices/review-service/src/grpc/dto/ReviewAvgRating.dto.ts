export class ReviewAvgRatingItemDTO {
	productId: number;
	avgRating: number;
	constructor(param: ReviewAvgRatingItemDTO) {
		for (const key in param) {
			if (!Object.keys(this).includes(key)) continue;
			this[key] = param[key];
		}
	}
}

export class ReviewAvgRatingDTO {
	items: ReviewAvgRatingItemDTO[];
	count: number;

	constructor(param: ReviewAvgRatingDTO) {
		for (const key in param) {
			if (!Object.keys(this).includes(key)) continue;
			this[key] = param[key];
		}
	}
}
