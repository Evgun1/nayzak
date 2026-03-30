export class ProductReviewsItemDTO {
	fullName: string;
	rating: number;
	text: string;
	image: Buffer;
	createdAt: Date;
	constructor(param: ProductReviewsItemDTO) {
		for (const key in param) {
			if (!Object.keys(this).includes(key)) continue;
			this[key] = param[key];
		}
	}
}

export class ProductReviewsDTO {
	reviews?: ProductReviewsItemDTO[];
	avgRating: number;
	totalCount: number;

	constructor(param: ProductReviewsDTO) {
		for (const key in param) {
			if (!Object.keys(this).includes(key)) continue;
			this[key] = param[key];
		}
	}
}
