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
						// brokers: ["localhost:29092", "localhost:39092"],
						brokers: (process.env.KAFKA_BROKERS as string)
							.split(",")
							.map((broker) => broker.trim()),
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
