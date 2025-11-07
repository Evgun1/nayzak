import { INestApplication, UnauthorizedException } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

export default function connectKafkaConsumer(app: INestApplication) {
	const connectMicroservice = app.connectMicroservice<MicroserviceOptions>;

	if (process.env.KAFKA_BROKERS) {
		connectMicroservice({
			transport: Transport.KAFKA,
			options: {
				client: {
					clientId: "catalog-service",
					brokers: process.env.KAFKA_BROKERS.split(", "),
				},
				consumer: {
					groupId: "catalog-review",
					allowAutoTopicCreation: true,
				},
			},
		});
		connectMicroservice({
			transport: Transport.KAFKA,
			options: {
				client: {
					clientId: "catalog-service",
					brokers: process.env.KAFKA_BROKERS.split(", "),
				},
				consumer: {
					groupId: "catalog-order",
					allowAutoTopicCreation: true,
				},
			},
		});
	} else {
		throw new UnauthorizedException(
			"KAFKA_BROKERS is not defined in environment variables",
		);
	}
}
