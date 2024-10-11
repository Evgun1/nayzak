import prismaClient from "../prismaClient";
import { CartGetDTO } from "./interfaces/CartGetInput";
import usersService from "../users/users.service";
import { CartDTO, CartModel } from "./cart.dto";
import { HTTPException } from "hono/http-exception";

export async function saveCart({ product, userToken }: CartGetDTO) {
  const user = await usersService.findUserByToken(userToken);

  const saveCart = await prismaClient.cart.create({
    data: {
      product_id: +product.productID,
      amount: +product.amount,
      user_id: user.id,
    },
  });

  const cartDTO = new CartDTO({
    amount: saveCart.amount,
    productID: saveCart.product_id,
    id: saveCart.id,
  });

  return cartDTO;
}
export async function updateCart({ product, userToken }: CartGetDTO) {
  const user = await usersService.findUserByToken(userToken);

  const updateCart = await prismaClient.cart.update({
    where: {
      id: +product.id,
      product_id: +product.productID,
      user_id: user.id,
    },
    data: { amount: +product.amount },
  });

  const cartDTO = new CartDTO({
    id: updateCart.id,
    amount: updateCart.amount,
    productID: updateCart.product_id,
  });

  return cartDTO;
}
export async function removeCart(id: number) {
  // const user = await usersService.findUserByToken(userToken);

  const deleteProduct = await prismaClient.cart.delete({
    where: {
      id: +id,
    },
  });

  return deleteProduct;
}

export async function check(token: string) {
  const user = await usersService.findUserByToken(token);

  const cart = await prismaClient.cart.findMany({
    where: { user_id: user.id },
  });

  const cartDTO: CartModel[] = [];

  cart.map((product) =>
    cartDTO.push({
      id: product.id,
      amount: product.amount,
      productID: product.product_id,
    })
  );

  return cartDTO;
}

export default {
  saveCart,
  check,
  removeCart,
  updateCart,
};
