import { Inject, Injectable } from "@nestjs/common";
import { RedisClientType } from "redis";

@Injectable()
export class RedisService {
	constructor(
		@Inject("REDIS_CLIENT") private readonly redisClient: RedisClientType,
	) {}

	redis() {
		return this.redisClient;
	}

	async set<T>(key: string, value: T, second?: number) {
		const options:
			| {
					expiration?: {
						type: "EX" | "PX";
						value: number;
					};
			  }
			| undefined = {};

		if (second) {
			options.expiration = { type: "EX", value: second };
		}

		return await this.redisClient.set(
			key,
			JSON.stringify(value as T),
			options,
		);
	}

	async expire(key: string, second: number) {
		return await this.redisClient.expire(key, second);
	}

	async get<T>(key: string) {
		const result = await this.redisClient.get(key);
		return result ? (JSON.parse(result) as T) : null;
	}

	async del(key: string) {
		await this.redisClient.del(key);
	}

	async hGet<T>(key: string, field: string | number) {
		const result = await this.redisClient.hGet(key, field.toString());
		return result ? (JSON.parse(result) as T) : null;
	}
	async hGetAll<T>(key: string) {
		const result = await this.redisClient
			.hGetAll(key)
			.then((data: object) => {
				return Object.entries(data).map(([key, val]) => {
					return { [key]: JSON.parse(val) };
				});
			});
		return result as Array<{ [actionLink: string]: T }>;
	}
	async hSet<T>(key: string, args: { [key: string]: T }) {
		const value = Object.entries(args)
			.map(([argsKey, value]) => {
				return {
					[argsKey]: JSON.stringify(value),
				};
			})
			.reduce((acc, cur) => ({ ...acc, ...cur }));

		return await this.redisClient.hSet(key, value);
	}

	async hSetEx<T>(key: string, args: { [key: string]: T }, second?: number) {
		const fields = Object.entries(args)
			.map(([argsKey, value]) => {
				return {
					[argsKey]: JSON.stringify(value),
				};
			})
			.reduce((acc, cur) => ({ ...acc, ...cur }));

		const options:
			| {
					expiration?: {
						type: "EX" | "PX";
						value: number;
					};
			  }
			| undefined = {};

		if (second) options.expiration = { type: "EX", value: second };

		await this.redisClient.hSetEx(key, fields, options);
	}

	async hExpire(key: string, fields: string | string[], second: number) {
		return await this.redisClient.hExpire(key, fields, second);
	}

	async hDel(key: string, field: string | string[] | number | number[]) {
		await this.redisClient.hDel(
			key,
			typeof field === "object"
				? field.map((data: string | number) => data.toString())
				: field.toString(),
		);
	}

	async ttl<T>(key: string) {
		return await this.redisClient.ttl(key);
	}

	// async zAdd(key: string) {
	// 	this.redisClient.zAdd(key, [], {
	// 		comparison: "GT",
	// 		condition: undefined,
	// 	});
	// }

	// async sort() {
	// 	this.redisClient.zAddIncr("", {}, { condition:  });
	// }
}
