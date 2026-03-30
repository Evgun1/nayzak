import { Module } from "@nestjs/common";
import { GrpcController } from "./grpc.controller";
import { PrismaService } from "src/services/prisma.service";
import { GrpcService } from "./grpc.service";

@Module({
	imports: [],
	controllers: [GrpcController],
	providers: [GrpcService, PrismaService],
})
export class GrpcModule {}
