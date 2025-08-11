import { ReviewsCacheItem } from "src/interface/reviewsCacheItem.interface";

export class ReviewsCacheDTO {
	id: number;
	rating: number;
	text: string;
	createdAt: Date;

	constructor(body: ReviewsCacheItem) {
		const { rating, text } = body;
		this.rating = rating;
		this.text = text;
		this.createdAt = new Date();
	}
}
