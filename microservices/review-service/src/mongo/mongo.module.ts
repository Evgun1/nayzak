import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewsMongoModule } from "./reviews/reviewsMongo.module";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot(),
		ReviewsMongoModule,
		MongooseModule.forRoot(process.env.MONGO_DB_URL as string, {
			auth: {
				username: process.env.MONGO_DB_USER,
				password: process.env.MONGO_DB_PASSWORD,
			},
			authSource: "admin",
		}),
	],
	exports: [ReviewsMongoModule, MongooseModule],
})
export class MongoModule {}
