import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KafkaService } from "./kafka.service";
import { retry } from "rxjs";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot(),
		ClientsModule.register([
			{
				name: "CATALOG_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "catalog-service",
						// brokers: JSON.parse(
						// 	process.env.KAFKA_BROKERS as string,
						// ),
						brokers: (process.env.KAFKA_BROKERS as string).split(
							", ",
						),
					},
					consumer: {
						groupId: "catalog-consumer",
					},
				},
			},

			{
				name: "USER_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "user-review-service",

						// brokers: JSON.parse(
						// 	process.env.KAFKA_BROKERS as string,
						// ),
						brokers: (process.env.KAFKA_BROKERS as string).split(
							", ",
						),
					},
					consumer: {
						groupId: "user-review-consumer",
					},
				},
			},
		]),
	],

	providers: [KafkaService],
	exports: [ClientsModule, KafkaService],
})
export class KafkaModule {}
