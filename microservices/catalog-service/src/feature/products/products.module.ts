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
@Module({
	imports: [
		KafkaModule,
		PrismaModule,
		QueryModule,
		ClientApiModule,
		RedisModule,
		ProductsCacheModule,
	],
	controllers: [ProductsController],
	providers: [ProductsService, ProductPrisma],
	exports: [ProductsService],
})
export class ProductsModule {}
