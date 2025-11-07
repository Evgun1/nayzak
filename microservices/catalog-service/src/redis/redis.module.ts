import { $Enums } from "@prisma/client";
import { Module } from "@nestjs/common";
import { redisProvider } from "./redisProvider";
import { RedisService } from "./redis.service";
import { ConfigModule } from "@nestjs/config";
import { createClient } from "redis";

@Module({
	imports: [ConfigModule.forRoot()],
	providers: [
		// redisProvider,
		RedisService,
		{
			provide: "REDIS_CLIENT",
			useFactory: async () => {
				const client = createClient({
					socket: {
						host: process.env.REDIS_DB_HOST,
						port: parseInt(process.env.REDIS_DB_PORT as string),
					},
					password: process.env.REDIS_DB_PASSWORD,
				});
				await client.connect();
				return client;
			},
		},
	],
	exports: [RedisService],
})
export class RedisModule {}
