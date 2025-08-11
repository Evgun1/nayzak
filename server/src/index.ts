import { serve } from "@hono/node-server";
import { Hono } from "hono";
import prismaClient from "./prismaClient";
import appRouter from "./route";
import errors from "./errors/errors";
import corsMiddleware from "./utils/middleware/corsMiddleware";
import "./appFirebase";
import redisClient from "./redisClient";

const app = new Hono();

app.use(corsMiddleware);
app.route("/", appRouter);
app.onError(errors);

const port = 3030;
console.log(`Server is running on port ${port}`);

async function start() {
    try {
        await prismaClient.$connect();
        await redisClient.connect();
        serve({
            fetch: app.fetch,
            port,
        });
    } catch (error) {
        console.log(error);
    }
}

start();
