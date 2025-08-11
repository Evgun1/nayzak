import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
	//   const app = await NestFactory.create(AppModule);
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.KAFKA,
			options: {
				client: {
					brokers: ["0.0.0.0:9092"],
				},
			},
		},
	);
	await app.listen();
	console.log("Server started");

	//   await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
