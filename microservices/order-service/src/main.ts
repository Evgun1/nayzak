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
				brokers: (process.env.KAFKA_BROKERS as string).split(", "),
			},
			consumer: {
				groupId: "order",
				allowAutoTopicCreation: true,
			},
		},
	});

	app.enableCors({
		// origin: process.env.CORS_URL,
		origin: process.env.CORS_URL ? process.env.CORS_URL.split(",") : true,
		credentials: true,
	});
	await app.startAllMicroservices();
	await app.listen(PORT, () =>
		console.log(`Server running on port: ${PORT}`),
	);
}
bootstrap();
