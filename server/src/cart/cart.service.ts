import prismaClient from "../prismaClient";
import { CartGetDTO } from "./interfaces/CartGetInput";
import usersService from "../users/users.service";
import { CartDTO, CartModel } from "./cart.dto";
import { HTTPException } from "hono/http-exception";

export async function saveCart({ cartProduct, userToken }: CartGetDTO) {
  const user = await usersService.findUserByToken(userToken);

  const saveCart = await prismaClient.cart.create({
    data: {
      product_id: cartProduct.productID,
      amount: cartProduct.amount,
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
export async function updateCart({ cartProduct, userToken }: CartGetDTO) {
  const user = await usersService.findUserByToken(userToken);

  console.log(cartProduct);

  const updateCart = await prismaClient.cart.update({
    where: {
      id: cartProduct.id,
      product_id: cartProduct.productID,
      user_id: user.id,
    },
    data: { amount: cartProduct.amount },
  });

  const cartDTO = new CartDTO({
    id: updateCart.id,
    amount: updateCart.amount,
    productID: updateCart.product_id,
  });

  return cartDTO;
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
  updateCart,
};