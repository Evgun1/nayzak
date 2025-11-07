import { INestApplication } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

export default function connectKafkaConsumer(app: INestApplication) {
	const connectMicroservice = app.connectMicroservice<MicroserviceOptions>;

	connectMicroservice({
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: "user-service",
				brokers: (process.env.KAFKA_BROKERS as string).split(", "),
			},
			consumer: {
				groupId: "user-order",
				allowAutoTopicCreation: true,
			},
		},
	});
	connectMicroservice({
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: "user-service",
				brokers: (process.env.KAFKA_BROKERS as string).split(", "),
			},
			consumer: {
				groupId: "user-review",
				allowAutoTopicCreation: true,
			},
		},
	});
}
