import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { GrpcService } from "./grpc.service";
import { GrpcController } from "./grpc.controller";
import { ReviewStatsMongoModule } from "src/mongo/review_stats/reviewStatsMongo.module";
import { MongoModule } from "src/mongo/mongo.module";
// import { ReviewsMongoModule } from "src/mongo/reviews/reviewsMongo.module";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "USER_PACKAGE",
				transport: Transport.GRPC,
				options: {
					url: "localhost:50052",
					package: "user",
					protoPath: join(
						process.cwd(),
						"src/proto/user.proto",
					),
				},
			},
		]),
		MongoModule,
	],
	controllers: [GrpcController],
	providers: [GrpcService],
	exports: [GrpcService, ClientsModule],
})
export class GrpcModule {}
