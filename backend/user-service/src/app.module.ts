import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { KafkaModule } from "./kafka/kafka.module";
import { RedisModule } from "./redis/redis.module";
import { CustomersModule } from "./feature/customers/customers.module";
import { ScheduleModule } from "@nestjs/schedule";
import { JwtModule } from "@nestjs/jwt";
import { WishlistModule } from "./feature/wishlist/wishlist.module";
import { AppMiddlewareConfigure } from "./middleware/appMiddleware.configure";
import { PrismaModule } from "./prisma/prisma.module";
import { QueryModule } from "./query/query.module";
import { AppController } from "./app.controller";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { CartModule } from "./feature/cart/cart.module";
import { LocalStrategy } from "./strategy/local.strategy";
import { AddressesModel } from "./feature/addresses/addresses.module";
import { ReviewModule } from "./feature/review/review.module";

@Module({
	imports: [
		ReviewModule,
		AddressesModel,
		CartModule,
		CustomersModule,
		WishlistModule,
		KafkaModule,
		RedisModule,
		PrismaModule,
		QueryModule,
		ScheduleModule.forRoot(),
		JwtModule.register({
			secret: process.env.JWT_SECRET_KEY,
			signOptions: { expiresIn: "30d" },
		}),
	],
	controllers: [AppController],
	providers: [AppService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
