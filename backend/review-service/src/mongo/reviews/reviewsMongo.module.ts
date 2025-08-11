import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import ReviewsSchema, { Review } from "./reviews.schema";
import { ReviewsMongoService } from "./reviewsMongo.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Review.name,
				schema: ReviewsSchema,
			},
		]),
	],
	providers: [ReviewsMongoService],
	exports: [ReviewsMongoService],
})
export class ReviewsMongoModule {}
