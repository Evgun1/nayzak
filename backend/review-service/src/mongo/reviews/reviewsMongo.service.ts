import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Review } from "./reviews.schema";
import { ReviewMongoArgs } from "./type/reviewsArgs.type";
import { IReviewMongo, ReviewMongo } from "./type/reviews.type";

export type ReviewSort = Partial<Record<keyof Review, "asc" | "desc">>;
export type ReviewWhere = Partial<Review>;

@Injectable()
export class ReviewsMongoService {
	constructor(
		@InjectModel(Review.name) private readonly reviewModel: Model<Review>,
	) {}

	async findAll(args?: ReviewMongoArgs) {
		const findAll = this.reviewModel.find({}, {}, {});

		if (args?.where) findAll.where(args.where);
		if (args?.sort) findAll.sort(args.sort);
		if (args?.limit) findAll.limit(args.limit);
		if (args?.skip) findAll.skip(args.skip);

		return (await findAll.exec()) as ReviewMongo;
	}

	async count(args?: ReviewMongoArgs) {
		const count = this.reviewModel.countDocuments();

		if (args?.where) count.where(args.where);
		if (args?.sort) count.sort(args.sort);
		if (args?.limit) count.limit(args.limit);
		if (args?.skip) count.skip(args.skip);

		return await count.exec();
	}

	async findOne(id: string) {
		return await this.reviewModel.findById(id).exec();
	}

	async create(item: Review): Promise<IReviewMongo> {
		const create = await this.reviewModel.create(item);

		return (await create.save()) as IReviewMongo;
	}

	async update(item: { id: number } & Review) {
		const update = await this.reviewModel
			.findByIdAndUpdate(item.id, item, {
				new: true,
			})
			.exec();
		return update;
	}
}
