import dotenv from "dotenv";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import prismaClient from "./prismaClient";
import appRouter from "./route";
import { cors } from "hono/cors";

dotenv.config();
const app = new Hono();

app.use(cors());
app.route("/", appRouter);

const port = 3030;
console.log(`Server is running on port ${port}`);

async function start() {
  await prismaClient.$connect();
  serve({
    fetch: app.fetch,
    port,
  });
}

start();
