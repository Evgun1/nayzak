import { AwaitExpression } from "./../node_modules/@types/estree/index.d";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Next, ValidationPipe } from "@nestjs/common";
const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.KAFKA,
		options: {
			client: {
				retry: {},
				clientId: "catalog-service",
				brokers: ["0.0.0.0:9092"],
			},
			consumer: {
				groupId: "catalog-consumer",
			},
		},
	});
	await app.startAllMicroservices();

	app.enableCors({
		origin: "http://localhost:2999",
		credentials: true,
	});
	app.enableCors({
		origin: "http://localhost:2998",
		credentials: true,
	});

	await app.listen(PORT, () => {
		console.log(`Server running on port: ${PORT}`);
	});

	// await appWishlistsDe.listen();
}
bootstrap();
