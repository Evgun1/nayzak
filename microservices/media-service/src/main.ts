import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

const PORT = process.env.PORT ?? 30001;
async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.GRPC,
		options: {
			url: "localhost:50054",
			package: "media",
			protoPath: join(process.cwd(), "src/proto/media.proto"),
		},
	});
	await app.listen(PORT).then((item) => {
		console.log(`Server running on port: ${PORT}`);
	});
}
bootstrap();
