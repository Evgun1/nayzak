import { createMiddleware } from "hono/factory";
import { ProductQueryDTO } from "./ProductQueryDTO";

const setupValue = (c: Hono) => {};

const mvCallback = async (c, next) => {
  c.set("", () => setup);
  await next();
};

export const createQueryDTO = createMiddleware<{
  variables: { queryDTO: ProductQueryDTO };
}>(mvCallback);
