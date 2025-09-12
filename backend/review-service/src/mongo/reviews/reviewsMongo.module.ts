import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewsMongoService } from "./reviewsMongo.service";
import { Review, ReviewsSchema } from "./reviews.schema";

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
