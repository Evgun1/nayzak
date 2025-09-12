import { Injectable } from "@nestjs/common";
import { Review } from "src/mongo/reviews/reviews.schema";
import { RedisService } from "src/redis/redis.service";
import { ReviewsCacheDTO } from "./dto/reviewsCache.dto";
import { ReviewMongo } from "src/mongo/reviews/type/reviews.type";
import { Interval } from "@nestjs/schedule";

@Injectable()
export class CacheService {
	constructor(private readonly redis: RedisService) {}
	async cachingReviewsByProductGetAll(productId: number) {
		const reviewsCache = await this.redis.hGetAll<ReviewsCacheDTO>(
			`product-reviews-${productId}`,
		);

		const reviews: ReviewsCacheDTO[] = [];

		for (const review of reviewsCache) {
			for (const key in review) {
				if (key.includes("cacheCreatedAt")) continue;
				reviews.push(new ReviewsCacheDTO(review[key]));
			}
		}

		return reviews;
	}

	async cachingReviewsByProductUpload(
		productId: number,
		reviews: ReviewMongo,
		customerData: { fullName: string; id: number }[],
	) {
		const redisArgs = {} as { [key: string]: ReviewsCacheDTO };

		for (const element of reviews) {
			const findUser = customerData.find(
				(item) => item.id === element.customersId,
			);
			if (!findUser) continue;

			redisArgs[element.id] = new ReviewsCacheDTO({
				id: element.id,
				fullName: findUser.fullName,
				rating: element.rating,
				text: element.text,
				customersId: element.customersId,
				createdAt: element.createAt,
			});
		}

		await this.redis.hSetEx<ReviewsCacheDTO>(
			`product-reviews-${productId}`,
			redisArgs,
		);
	}

	@Interval(6e5)
	async reviewsByProductInterval() {
		const keys = await this.redis.redis().keys("*");
		for (const key of keys) {
			if (!key.includes("product-reviews")) continue;
			const createdAt = (await this.redis.hGet(
				key,
				"cacheCreatedAt",
			)) as string;

			const cacheDate = new Date(createdAt);
			const carrDate = new Date();

			const diffMs = carrDate.getTime() - cacheDate.getTime();
			const diffMin = diffMs / 1000 / 60;

			if (diffMin >= 10) this.redis.del(key);
		}
	}
}
