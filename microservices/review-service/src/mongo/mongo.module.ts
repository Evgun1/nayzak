import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewsMongoModule } from "./reviews/reviewsMongo.module";
import { ConfigModule } from "@nestjs/config";
import { ReviewStatsMongoModule } from "./review_stats/reviewStatsMongo.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		ReviewsMongoModule,
		ReviewStatsMongoModule,
		MongooseModule.forRoot(process.env.MONGO_DB_URL as string, {
			auth: {
				username: process.env.MONGO_DB_USER,
				password: process.env.MONGO_DB_PASSWORD,
			},
			authSource: "admin",
		}),
	],
	exports: [ReviewsMongoModule, ReviewStatsMongoModule, MongooseModule],
})
export class MongoModule {}
