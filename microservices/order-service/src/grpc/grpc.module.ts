import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "USER_PACKAGE",
				transport: Transport.GRPC,
				options: {
					url: "localhost:50052",
					package: "user",
					protoPath: join(process.cwd(), "src/proto/user.proto"),
				},
			},
			{
				name: "CATALOG_PACKAGE",
				transport: Transport.GRPC,
				options: {
					url: "localhost:50053",
					package: "user",
					protoPath: join(process.cwd(), "src/proto/catalog.proto"),
				},
			},
		]),
	],
})
export class GrpcModule {}
