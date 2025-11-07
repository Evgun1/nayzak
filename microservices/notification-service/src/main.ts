import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { KafkaConfig } from "kafkajs";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.KAFKA,
			options: {
				client: {
					clientId: "notification-service",
					brokers: (process.env.KAFKA_BROKERS as string).split(", "),
				} as KafkaConfig,
				consumer: {
					groupId: "notification",
				},
			},
		},
	);
	await app.listen().then(() => {
		console.log("Service running");
	});
}
bootstrap();
