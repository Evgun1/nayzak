import { AwaitExpression } from "./../node_modules/@types/estree/index.d";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Next, ValidationPipe } from "@nestjs/common";
import connectKafkaConsumer from "./kafka/connectKafkaConsumer";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 10003;

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);

	connectKafkaConsumer(app);
	await app.startAllMicroservices();

	app.enableCors({
		origin: process.env.CORS_URL ? process.env.CORS_URL.split(", ") : true,
		credentials: true,
	});

	await app.listen(PORT, () => {
		console.log(`Server running on port: ${PORT}`);
	});
}
bootstrap();
