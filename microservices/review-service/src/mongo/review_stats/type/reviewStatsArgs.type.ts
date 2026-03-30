import { FilterQuery } from "mongoose";
import { ReviewStats } from "./../reviewStats.schema";
export type ReviewStatsWhere = FilterQuery<ReviewStats>;
export type ReviewStatsSort = Partial<
	Record<keyof ReviewStats, "asc" | "desc">
>;

export type ReviewStatsArgs = {
	where?: ReviewStatsWhere;
	sort?: ReviewStatsSort;
	skip?: number;
	limit?: number;
};
