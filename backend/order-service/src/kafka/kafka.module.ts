import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KafkaService } from "./kafka.service";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "USER_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "user-service",
						brokers: ["0.0.0.0:9092"],
					},
					consumer: {
						groupId: "user-consumer",
					},
				},
			},
			{
				name: "CATALOG_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "catalog-service",
						brokers: ["0.0.0.0:9092"],
					},
					consumer: {
						groupId: "catalog-consumer",
					},
				},
			},
		]),
	],
	providers: [KafkaService],
	exports: [KafkaService, ClientsModule],
})
export class KafkaModule {}
