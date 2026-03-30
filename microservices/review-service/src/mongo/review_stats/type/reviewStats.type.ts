export interface IReviewStatsMongo {
	id: string;
	rating: number;
	reviewsCount: number;
	createAt: Date;
	updateAt: Date;
	productsId: number;
}

export type ReviewStatsMongo = Array<IReviewStatsMongo>;
