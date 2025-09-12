import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KafkaModule } from "./kafka/kafka.module";
import { RedisModule } from "./redis/redis.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewsMongoModule } from "./mongo/reviews/reviewsMongo.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { CacheModule } from "./cache/cache.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ClientApiModule } from "./client-api/clientApi.module";

@Module({
	imports: [
		RedisModule,
		CacheModule,
		KafkaModule,
        ClientApiModule,
		ConfigModule.forRoot(),
		ScheduleModule.forRoot(),
		MongooseModule.forRoot("mongodb://0.0.0.0:5057/reviews", {
			auth: { username: "nayzak", password: "nayzak" },
			authSource: "admin",
		}),
		ReviewsMongoModule,

		JwtModule.register({
			secret: process.env.JWT_SECRET_KEY as string,
		}),
	],
	controllers: [AppController],
	providers: [AppService, JwtStrategy],
})
export class AppModule {}
