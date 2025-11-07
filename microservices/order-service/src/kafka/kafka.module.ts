import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KafkaService } from "./kafka.service";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({}),
		ClientsModule.register([
			{
				name: "USER_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "user-service",
						brokers: (process.env.KAFKA_BROKERS as string).split(
							", ",
						),
					},
					consumer: {
						groupId: "user-order",
					},
				},
			},
			{
				name: "CATALOG_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "catalog-service",
						brokers: (process.env.KAFKA_BROKERS as string).split(
							", ",
						),
					},
					consumer: {
						groupId: "catalog-order",
					},
				},
			},
		]),
	],
	providers: [KafkaService],
	exports: [KafkaService, ClientsModule],
})
export class KafkaModule {}
