import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GrpcModule } from "./grpc/grpc.module";
import { PrismaService } from "./services/prisma.service";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [GrpcModule, ConfigModule.forRoot({ isGlobal: true })],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
