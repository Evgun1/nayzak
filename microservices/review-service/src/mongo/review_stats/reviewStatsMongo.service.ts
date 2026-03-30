import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ReviewStats } from "./reviewStats.schema";
import { Model } from "mongoose";
import { ReviewStatsArgs } from "./type/reviewStatsArgs.type";
import { IReviewStatsMongo } from "./type/reviewStats.type";

@Injectable()
export class ReviewStatsMongoService {
	constructor(
		@InjectModel(ReviewStats.name)
		private readonly reviewStatsModel: Model<ReviewStats>,
	) {}

	async findAll(args?: ReviewStatsArgs) {
		const findAll = this.reviewStatsModel.find({}, {}, {});
		if (args?.where) findAll.where(args.where);
		if (args?.sort) findAll.sort(args.sort);
		if (args?.limit) findAll.limit(args.limit);
		if (args?.skip) findAll.skip(args.skip);

		return await findAll.exec();
	}

	async count(args?: ReviewStatsArgs) {
		const count = this.reviewStatsModel.countDocuments();

		if (args?.where) count.where(args.where);
		if (args?.sort) count.sort(args.sort);
		if (args?.limit) count.limit(args.limit);
		if (args?.skip) count.skip(args.skip);

		return await count.exec();
	}

	async findById(id: string) {
		return await this.reviewStatsModel.findById(id).exec();
	}
	async findOne(args?: ReviewStatsArgs) {
		const findOne = this.reviewStatsModel.findOne({}, {}, {});
		if (args?.where) findOne.where(args.where);
		if (args?.sort) findOne.sort(args.sort);
		if (args?.limit) findOne.limit(args.limit);
		if (args?.skip) findOne.skip(args.skip);

		return await findOne.exec();
	}

	async create(item: ReviewStats) {
		const create = await this.reviewStatsModel.create(item);
		return await create.save();
	}
}
