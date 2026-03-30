import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import * as bodyParser from "body-parser";
import connectKafkaConsumer from "./kafka/connectKafkaConsumer";
import { join } from "path/win32";

const PORT = process.env.PORT ?? 3002;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(bodyParser.urlencoded({ extended: true }));
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	connectKafkaConsumer(app);
	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.GRPC,
		options: {
			url: "localhost:50052",
			package: "user",
			protoPath: join(process.cwd(), "src/proto/user.proto"),
		},
	});
	await app.startAllMicroservices();
	app.enableCors({
		// origin: process.env.CORS_URL,
		origin: process.env.CORS_URL ? process.env.CORS_URL.split(", ") : true,
		credentials: true,
	});

	await app.listen(PORT, () =>
		console.log(`Server running on port: ${PORT}`),
	);
}
bootstrap();
