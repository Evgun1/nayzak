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
					brokers: ["localhost:29092", "localhost:39092"],
					rebalanceTimeout: 60000,
					allowAutoTopicCreation: false,
					heartbeatInterval: 3000,
					sessionTimeout: 45000,
					retry: {
						initialRetryTime: 300,
						retries: 5,
					},
				},
				subscribe: { fromBeginning: false },
			},
		},
	);
	await app.listen();
	console.log("Server started");

	//   await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
