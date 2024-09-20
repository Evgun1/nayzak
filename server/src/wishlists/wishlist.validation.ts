import { Context, Next } from "hono";
import { WishlistInputDTO } from "./interface/WishlistGetIntut";
import prismaClient from "../prismaClient";
import { HTTPException } from "hono/http-exception";
import usersService from "../users/users.service";

export async function save(c: Context, next: Next) {
  const {
    currentProduct: { productID },
    userToken,
  } = await c.req.json<WishlistInputDTO>();

  const userID = (await usersService.findUserByToken(userToken)).id;

  const wishlist = await prismaClient.wishlist.findFirst({
    where: { product_id: productID, user_id: userID },
  });

  if (wishlist) {
    throw new HTTPException(400, {
      message: "The product exists with the user",
    });
  }
  await next();
}

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
  save,
  remove,
};
