import { serve } from "@hono/node-server";
import { Hono } from "hono";
import prismaClient from "./prismaClient";
import appRouter from "./router";
import { cors } from "hono/cors";

const app = new Hono();
app.use(cors());
app.route("/", appRouter);

const port = 3030;
console.log(`Server is running on port ${port}`);

async function start() {
  try {
    await prismaClient.$connect();
    serve({
      fetch: app.fetch,
      port,
    });
  } catch (error) {
    console.log(error);
  }
}

start();
