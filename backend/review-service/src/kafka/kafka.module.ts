import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "CATALOG_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "catalog-service",
						brokers: ["localhost:9092"],
					},
					consumer: {
						groupId: "catalog-consumer",
					},
				},
			},
		]),
	],
	exports: [ClientsModule],
})
export class KafkaModule {}
