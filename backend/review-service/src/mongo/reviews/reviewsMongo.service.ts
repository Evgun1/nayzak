import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Review } from "./reviews.schema";

interface Args {
	where?: Partial<Review>;
	sort?: Record<keyof Review, "asc" | "desc">;
	skip?: number;
	limit?: number;
}

@Injectable()
export class ReviewsMongoService {
	constructor(
		@InjectModel(Review.name) private readonly reviewModel: Model<Review>,
	) {}

	async findAll(args?: Args) {
		const findAll = this.reviewModel.find({}, {}, {});

		if (args?.where) findAll.where(args.where);
		if (args?.sort) findAll.sort(args.sort);
		if (args?.limit) findAll.limit(args.limit);
		if (args?.skip) findAll.skip(args.skip);

		return await findAll.exec();
	}

	async count(args?: Args) {
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

	async create(item: Review): Promise<Review> {
		const create = await this.reviewModel.create(item);

		return await create.save();
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
