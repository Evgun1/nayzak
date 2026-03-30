import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { QueryModule } from "src/query/query.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { ClientApiModule } from "src/client-api/clientApi.module";
import { RedisModule } from "src/redis/redis.module";
import { ProductPrisma } from "./prisma/product.prisma";
import { ProductsCacheModule } from "./cache/productsCache.module";
import { KafkaModule } from "src/kafka/kafka.module";
import { GrpcModule } from "src/grpc/grpc.module";
import { ProductsResolver } from "./products.resolver";
@Module({
	imports: [
		GrpcModule,
		KafkaModule,
		PrismaModule,
		QueryModule,
		ClientApiModule,
		RedisModule,
		ProductsCacheModule,
	],
	controllers: [ProductsController],
	providers: [ProductsResolver, ProductsService, ProductPrisma],
	exports: [ProductsService],
})
export class ProductsModule {}
