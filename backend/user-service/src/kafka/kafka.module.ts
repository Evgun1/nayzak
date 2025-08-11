import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "MAIL_NOTIFICATION_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "mail",
						brokers: ["localhost:9092"],
					},
					consumer: {
						groupId: "mail-consumer",
					},
				},
			},
		]),
		ClientsModule.register([
			{
				name: "REVIEW_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "review-service",
						brokers: ["localhost:9092"],
					},
					consumer: {
						groupId: "review-consumer",
					},
				},
			},
		]),
	],
	exports: [ClientsModule],
})
export class KafkaModule {}
