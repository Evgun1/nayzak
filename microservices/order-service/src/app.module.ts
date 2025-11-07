import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { KafkaModule } from "./kafka/kafka.module";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		PrismaModule,
		KafkaModule,
		JwtModule.register({
			// secret: "JWT_SECRET_KEY" as string,
			secret: process.env.JWT_SECRET_KEY as string,
		}),

		ConfigModule.forRoot({}),
	],
	controllers: [AppController],
	providers: [AppService, JwtStrategy],
})
export class AppModule {}
