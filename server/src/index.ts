import { serve } from "@hono/node-server";
import { Context, Hono } from "hono";
import prismaClient from "./prismaClient";
import appRouter from "./router";
import { cors } from "hono/cors";
import errors from "./errors/errors";
import { HTTPException } from "hono/http-exception";

const app = new Hono();
app.use(cors());
app.route("/", appRouter);
app.onError(errors);

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
