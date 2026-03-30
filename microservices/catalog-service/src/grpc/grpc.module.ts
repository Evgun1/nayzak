import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { GrpcService } from "./grpc.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { GrpcReviewService } from "./services/grpcReview.service";
import { GrpcMediaService } from "./services/grpcMedia.service";

@Module({
	imports: [
		PrismaModule,
		ClientsModule.register([
			{
				name: "REVIEW_PACKAGE",
				transport: Transport.GRPC,
				options: {
					url: "localhost:50051",
					package: "review",
					protoPath: join(process.cwd(), "src/proto/review.proto"),
				},
			},
			{
				name: "MEDIA_PACKAGE",
				transport: Transport.GRPC,
				options: {
					url: "localhost:50054",
					package: "media",
					protoPath: join(process.cwd(), "src/proto/media.proto"),
				},
			},
		]),
	],
	providers: [GrpcService, GrpcReviewService, GrpcMediaService],
	exports: [GrpcService, ClientsModule],
})
export class GrpcModule {}
