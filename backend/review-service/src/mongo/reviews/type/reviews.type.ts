import { Review } from "../reviews.schema";

export type IReviewMongo = {
	id: string;
	rating: number;
	text: string;
	createAt: Date;
	updateAt: Date;
	customersId: number;
	productsId: number;
};

export type ReviewMongo = Array<IReviewMongo>;
