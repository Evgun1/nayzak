import { Module } from "@nestjs/common";
import { RedisModule } from "src/redis/redis.module";
import { ProductsCacheService } from "./productsCache.service";

@Module({
	imports: [RedisModule],
	providers: [ProductsCacheService],

	exports: [ProductsCacheService],
})
export class ProductsCacheModule {}
