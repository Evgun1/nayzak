import { Module } from "@nestjs/common";
import {  ClientsModule, Transport } from "@nestjs/microservices";

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
	],
	exports: [ClientsModule],
})
export class KafkaModule {}
