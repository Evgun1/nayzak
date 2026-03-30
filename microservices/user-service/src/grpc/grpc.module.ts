import { Module } from "@nestjs/common";
import { GrpcService } from "./grpc.service";
import { GrpcController } from "./grpc.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
	imports: [PrismaModule],
	controllers: [GrpcController],
	providers: [GrpcService],
	exports: [GrpcService],
})
export class GrpcModule {}
