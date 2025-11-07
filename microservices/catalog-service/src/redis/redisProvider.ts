export const REDIS_CLIENT = "REDIS_CLIENT";

import { Provider } from "@nestjs/common";
import { createClient } from "redis";

export const redisProvider: Provider = {
	provide: REDIS_CLIENT,
	useFactory: async () => {
		const client = createClient({
			socket: {
				host: process.env.REDIS_DB_HOST,
				port: parseInt(process.env.REDIS_DB_PORT as string),
			},
			password: process.env.REDIS_DB_PASSWORD,
		});
		await client.connect();
		return client;
	},
};
