// import { Injectable } from "@nestjs/common";
// import { InjectConnection, InjectModel } from "@nestjs/mongoose";
// import { Connection, Model } from "mongoose";

// @Injectable()
// export class ReviewsMongoService {
// 	constructor(
// 		@InjectModel(Review.name) private readonly reviewModel: Model<Review>,
// 	) {}

// 	async findAll() {
// 		return await this.reviewModel.find().exec();
// 	}

// 	async findOne(id: number) {
// 		return await this.reviewModel.findById(id).exec();
// 	}

// 	async create(item: Review): Promise<Review> {
// 		const create = await this.reviewModel.create(item);
// 		return await create.save();
// 	}

// 	async update(item: { id: number } & Review) {
// 		const update = await this.reviewModel
// 			.findByIdAndUpdate(item.id, item, {
// 				new: true,
// 			})
// 			.exec();
// 		return update;
// 	}
// }
