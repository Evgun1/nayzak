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
					brokers: (process.env.KAFKA_BROKERS as string)
						.split(",")
						.map((broker) => broker.trim()),
					// brokers: ["localhost:29092", "localhost:39092"],
					// retry: {
					// 	initialRetryTime: 300,
					// 	retries: 5,
					// },
				},
				// subscribe: { fromBeginning: false },
			},
		},
	);
	await app.listen();
	console.log("Server started");

	//   await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
