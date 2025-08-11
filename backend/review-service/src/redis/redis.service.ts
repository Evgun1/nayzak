import { Inject, Injectable } from "@nestjs/common";
import { RedisClientType } from "redis";
import { ReviewsCacheDTO } from "src/dto/reviewsCache.dto";
import { ReviewsCacheItem } from "src/interface/reviewsCacheItem.interface";

@Injectable()
export class RedisService {
	constructor(
		@Inject("REDIS_CLIENT") private readonly client: RedisClientType,
	) {}

	async redisReviews() {
		return new RedisReviews(this.client);
	}

	// async reviews() {
	// 	return {
	// 		set: new setReviews(),
	// 	};
	// }

	// async set(key: string, value: Record<string, any>) {
	// 	await this.client.set(key, JSON.stringify(value));
	// }

	// async get<T>(key: string) {
	// 	const result = await this.client.get(key);
	// 	return result ? (JSON.parse(result) as T) : null;
	// }

	// async hGet<T>(key: string, field: string) {
	// 	const result = await this.client.hGet(key, field);
	// 	return result ? (JSON.parse(result) as T) : null;
	// }
	// async hGetAll<T>(key: string) {
	// 	const result: Array<{ [actionLink: string]: T }> = await this.client
	// 		.hGetAll(key)
	// 		.then((data: object) => {
	// 			return Object.entries(data).map(([key, val]) => {
	// 				return { [key]: JSON.parse(val) };
	// 			});
	// 		});
	// 	return result;
	// }
	// async hSet(key: string, field: string, value: Record<string, any>) {
	// 	await this.client.hSet(key, field, JSON.stringify(value));
	// }

	// async hDel(key: string, field: string | string[]) {
	// 	// this.client.append("hDel", key);
	// 	this.client.hDel(key, field);
	// }

	// async appdata(key: string, value: Record<string, any>) {
	// 	this.client.append(key, JSON.stringify(value));
	// }
}

class RedisReviews {
	constructor(private readonly redis: RedisClientType) {}
	async set(value: ReviewsCacheItem) {
		const data = new ReviewsCacheDTO(value);

		return await this.redis.hSet(
			value.productsId.toString(),
			value.customersId,
			JSON.stringify(data),
		);
	}

	async get(key: string | number) {
		return await this.redis.get(key.toString());
	}

	async delete() {
		// this.redis.hDel();
	}
}
