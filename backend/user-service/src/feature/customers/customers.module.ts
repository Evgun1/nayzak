import { Module } from "@nestjs/common";
import { CustomersController } from "./customers.controller";
import { CustomersService } from "./customer.service";
import { KafkaModule } from "../../kafka/kafka.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { QueryService } from "src/query/query.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ClientApiService } from "src/client-api/clientApi.service";
import { QueryModule } from "src/query/query.module";
import { ClientApiModule } from "src/client-api/clientApi.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "src/guard/jwtAuth.guard";

@Module({
	imports: [PrismaModule, QueryModule, JwtModule, ClientApiModule],
	controllers: [CustomersController],
	providers: [CustomersService],
	exports: [CustomersService],
})
export class CustomersModule {}
