import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import * as bodyParser from "body-parser";

const PORT = process.env.PORT ?? 3002;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(bodyParser.urlencoded({ extended: true }));
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.KAFKA,

		options: {
			client: {
				clientId: "user-service",
				brokers: ["0.0.0.0:9092"],
			},
			consumer: {
				groupId: "user-consumer",
			},
		},
	});

	await app.startAllMicroservices();

	app.enableCors({
		origin: ["http://localhost:2999", "http://localhost:2998"],
		credentials: true,
		exposedHeaders: ["Authorization"],
	});

	await app.listen(PORT, () =>
		console.log(`Server running on port: ${PORT}`),
	);
}
bootstrap();
