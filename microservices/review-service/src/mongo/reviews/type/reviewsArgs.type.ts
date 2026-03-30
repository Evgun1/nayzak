import { FilterQuery } from "mongoose";
import { IReviewMongo } from "./reviews.type";

export type ReviewMongoWhere = FilterQuery<IReviewMongo>;
export type ReviewMongoSort = Partial<
	Record<keyof IReviewMongo, "asc" | "desc">
>;

export type ReviewMongoArgs = {
	where?: ReviewMongoWhere;
	sort?: ReviewMongoSort;
	skip?: number;
	limit?: number;
};
