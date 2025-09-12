import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KafkaService } from "./kafka.service";
import { retry } from "rxjs";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "CATALOG_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "catalog-service",
						brokers: ["localhost:29092", "localhost:39092"],
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
						clientId: "user-service",
						brokers: ["localhost:29092", "localhost:39092"],
					},
					consumer: {
						groupId: "user-consumer",
					},
				},
			},
		]),
	],

	providers: [KafkaService],
	exports: [ClientsModule, KafkaService],
})
export class KafkaModule {}
