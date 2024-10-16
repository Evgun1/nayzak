import {
  appCartDelete,
  appCartInitPost,
  appCartPost,
  appCartPut,
} from "@/utils/http/cart";
import { AppDispatch, RootState } from "../../store";
import { cartAction, CartItemData } from "./cart";
import { useCookiGet } from "@/hooks/useCookie";
import { appCookiGet } from "@/utils/http/cookie";

export function initCart() {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const userToken = await appCookiGet("user-token");

    if (!userToken) return;

    const cartProducts = await appCartInitPost(userToken);

    if (!cartProducts) return;

    dispatch(cartAction.saveCart(cartProducts));
  };
}

export function updateCart(currentProduct: CartItemData) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const userToken = useCookiGet("user-token");

    if (!userToken) return;

    const productsCartArray = [...getState().cart.productsArray];

    const productIndex = productsCartArray.findIndex(
      ({ productID }) => productID === currentProduct.productID
    );

    if (productIndex === -1) {
      const saveProduct = await appCartPost({
        product: currentProduct,
        userToken,
      });
      if (!saveProduct) return;
      productsCartArray.push(
        ...[
          {
            id: saveProduct.id,
            productID: saveProduct.productID,
            amount: saveProduct.amount,
          },
        ]
      );
    } else {
      currentProduct.amount += productsCartArray[productIndex].amount;

      const cartId = productsCartArray
        .filter((item) => item.productID === currentProduct.productID)
        .map((data) => data.id);

      const updateProduct = await appCartPut(
        {
          amount: currentProduct.amount,
          productID: currentProduct.productID,
          id: cartId[0],
        },
        `${userToken}`
      );

      if (!updateProduct) return;

      productsCartArray[productIndex] = {
        id: updateProduct.id,
        productID: updateProduct.productID,
        amount: updateProduct.amount,
      };
    }

    dispatch(cartAction.saveCart(productsCartArray));
  };
}

export function changeAmount(currentProduct: CartItemData) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const productsArray = [...getState().cart.productsArray];

    const userToken = useCookiGet("user-token");
    if (!userToken) return;

    const productIndex = productsArray.findIndex(
      ({ productID }) => productID === currentProduct.productID
    );
    if (productIndex === -1) return;

    const cartId = productsArray
      .filter((item) => item.productID === currentProduct.productID)
      .map((data) => data.id);

    const cartProduct = await appCartPut(
      {
        amount: currentProduct.amount,
        productID: currentProduct.productID,
        id: cartId[0],
      },
      userToken
    );

    if (!cartProduct) return;

    productsArray[productIndex] = {
      amount: cartProduct.amount,
      productID: cartProduct.productID,
      id: cartProduct.id,
    };

    dispatch(cartAction.saveCart(productsArray));
  };
}

export function removeCart(productId: number) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const id = getState()
      .cart.productsArray.filter((cart) => cart.productID === productId)
      .map((product) => product.id);

    if (!id[0]) return;

    await appCartDelete(id[0]);
    dispatch(cartAction.removeCart(productId));
  };
}
