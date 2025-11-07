import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KafkaService } from "./kafka.service";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "MAIL_NOTIFICATION_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "notification-service",
						brokers: (process.env.KAFKA_BROKERS as string).split(
							", ",
						),
					},
					consumer: {
						groupId: "notification",
					},
				},
			},
			{
				name: "REVIEW_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "review-user-service",
						brokers: (process.env.KAFKA_BROKERS as string).split(
							", ",
						),
					},
					consumer: {
						groupId: "review-user",
					},
				},
			},
		]),
	],
	providers: [KafkaService],
	exports: [ClientsModule, KafkaService],
})
export class KafkaModule {}
