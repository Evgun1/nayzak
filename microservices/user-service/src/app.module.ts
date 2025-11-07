import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { KafkaModule } from "./kafka/kafka.module";
import { RedisModule } from "./redis/redis.module";
import { CustomersModule } from "./feature/customers/customers.module";
import { ScheduleModule } from "@nestjs/schedule";
import { JwtModule } from "@nestjs/jwt";
import { WishlistModule } from "./feature/wishlist/wishlist.module";
import { PrismaModule } from "./prisma/prisma.module";
import { QueryModule } from "./query/query.module";
import { AppController } from "./app.controller";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { CartModule } from "./feature/cart/cart.module";
import { LocalStrategy } from "./strategy/local.strategy";
import { AddressesModel } from "./feature/addresses/addresses.module";
import { ConfigModule } from "@nestjs/config";
import { CreateUsersModule } from "./tools/createUsers/createUsers.module";
import { CredentialsModule } from "./feature/credentials/credentials.module";

@Module({
	imports: [
		CredentialsModule,
		CreateUsersModule,
		AddressesModel,
		CartModule,
		CustomersModule,
		WishlistModule,
		KafkaModule,
		RedisModule,
		PrismaModule,
		QueryModule,
		ScheduleModule.forRoot(),
		ConfigModule.forRoot({ isGlobal: true }),
		JwtModule.register({
			secret: process.env.JWT_SECRET_KEY,
			signOptions: { expiresIn: "5 days" },
		}),
	],
	controllers: [AppController],
	providers: [AppService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
