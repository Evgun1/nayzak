import { Context, Next } from "hono";
import prismaClient from "../prismaClient";
import { HTTPException } from "hono/http-exception";

export async function remove(c: Context, next: Next) {
  const { id } = await c.req.json();

  const wishlist = await prismaClient.wishlist.findFirst({
    where: { id },
  });

  if (!wishlist)
    throw new HTTPException(400, {
      message: `Product not found`,
    });

  await next();
}

export default {
  remove,
};
