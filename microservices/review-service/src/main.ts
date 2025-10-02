import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ValidationPipe } from "@nestjs/common";
import { subscribe } from "diagnostics_channel";
const PORT = process.env.PORT ?? 3001;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	console.log((process.env.KAFKA_BROKERS as string).split(", "));

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: "review-service",
				brokers: (process.env.KAFKA_BROKERS as string).split(", "),
				// brokers: JSON.parse(process.env.KAFKA_BROKERS as string),
			},
			consumer: {
				groupId: "review-consumer",
				// rebalanceTimeout: 60000,
				// heartbeatInterval: 3000,
				// sessionTimeout: 60000,
				// // maxBytes: 20971520,

				// retry: {
				// 	initialRetryTime: 300,
				// 	retries: 5,
				// },
				// allowAutoTopicCreation: false,
			},
			// subscribe: { fromBeginning: true },
		},
	});

	await app.startAllMicroservices();
	app.enableCors({
		origin: "http://localhost:2999",
		credentials: true,
	});
	await app.listen(PORT, () =>
		console.log(`Server running on port: ${PORT}`),
	);
}
bootstrap();
