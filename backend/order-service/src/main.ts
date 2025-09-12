import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
	const PORT = process.env.PORT ?? 3003;
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: "order-service",
				brokers: ["localhost:29092", "localhost:39092"],
			},
			consumer: {
				groupId: "order-consumer",
				rebalanceTimeout: 60000,
				allowAutoTopicCreation: false,
				heartbeatInterval: 3000,
				sessionTimeout: 45000,
				retry: {
					initialRetryTime: 300,
					retries: 5,
				},
			},
			subscribe: { fromBeginning: true },
		},
	});

	app.enableCors({
		origin: ["http://localhost:2999", "http://localhost:2998"],
		credentials: true,
	});
	// app.enableCors({
	// 	origin: "http://localhost:2998",
	// 	credentials: true,
	// });
	await app.startAllMicroservices();
	await app.listen(PORT, () =>
		console.log(`Server running on port: ${PORT}`),
	);
}
bootstrap();
