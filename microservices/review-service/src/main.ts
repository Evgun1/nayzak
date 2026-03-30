import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ValidationPipe } from "@nestjs/common";
import { subscribe } from "diagnostics_channel";
import connectKafkaConsumer from "./kafka/connectKafkaConsumer";
import { join } from "path";
const PORT = process.env.PORT ?? 3001;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	connectKafkaConsumer(app);

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.GRPC,
		options: {
			url: "localhost:50051",
			package: "review",
			protoPath: join(process.cwd(), "src/proto/review.proto"),
		},
	});

	await app.startAllMicroservices();

	app.enableCors({
		origin: process.env.CORS_URL ? process.env.CORS_URL.split(", ") : true,

		credentials: true,
	});
	await app.listen(PORT, () =>
		console.log(`Server running on port: ${PORT}`),
	);
}
bootstrap();
