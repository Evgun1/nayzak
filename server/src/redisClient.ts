import { createClient } from "redis";

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT ?? "6379"),
    },
    password: process.env.REDIS_PASSWORD,
    // username: process.env.REDIS_USER,
});

export default redisClient;
