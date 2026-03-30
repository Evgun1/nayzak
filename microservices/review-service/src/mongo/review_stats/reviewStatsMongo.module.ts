import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewStatsSchema } from "./reviewStats.schema";
import { ReviewStatsMongoService } from "./reviewStatsMongo.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: "ReviewStats",
				schema: ReviewStatsSchema,
			},
		]),
	],
	providers: [ReviewStatsMongoService],
	exports: [ReviewStatsMongoService],
})
export class ReviewStatsMongoModule {}
