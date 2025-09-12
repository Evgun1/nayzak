import { $Enums } from "@prisma/client";
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
				brokers: ["localhost:29092", "localhost:39092"],
			},
			consumer: {
				groupId: "user-consumer",
				rebalanceTimeout: 60000,
				heartbeatInterval: 3000,
				sessionTimeout: 60000,
				maxBytes: 20971520,

				retry: {
					initialRetryTime: 300,
					retries: 5,
				},
				allowAutoTopicCreation: false,
			},
			subscribe: { fromBeginning: true },
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
