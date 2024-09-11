import { log } from "console";
import { MiddlewareHandler } from "hono";
import { cors } from "hono/cors";

const corsMiddleware: MiddlewareHandler = async (c, next) => {
  const corsHandler = cors({
    origin: "http://localhost:3000",
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PUT"],
    allowHeaders: [
      "Origin",
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Methods",
    ],
  });

  return corsHandler(c, next);
};

export default corsMiddleware;
