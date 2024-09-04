import { Token } from "@/hooks/useToken";
import { AppDispatch, RootState } from "../../store";
import { cartAction, CartItemData } from "./cart";
import { Cart } from "@/hooks/useFetchCart";
import useFetch from "@/hooks/useFetch";
import { CartType } from "@/types/cart";

export function initCart() {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const cartProducts = await Cart.useFetchCheck();
    if (!cartProducts) return;

    dispatch(cartAction.saveCart(cartProducts));
  };
}

export function updateCart(currentProduct: CartItemData) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const tocken = await Token.useGet();

    if (!tocken) return;

    const productsCartArray = [...getState().cart.productsArray];

    const productIndex = productsCartArray.findIndex(
      ({ productID }) => productID === currentProduct.productID
    );

    if (productIndex === -1) {
      const saveProduct = await Cart.useFetchSave({
        product: currentProduct,
        userToken: tocken,
      });

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

      const updateProduct = await Cart.useFetchUpdate({
        product: {
          amount: currentProduct.amount,
          productID: currentProduct.productID,
          id: cartId[0],
        },
        userToken: tocken,
      });

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

    const userToken = Token.useGet();
    if (!userToken) return;

    const productIndex = productsArray.findIndex(
      ({ productID }) => productID === currentProduct.productID
    );
    if (productIndex === -1) return;

    const cartId = productsArray
      .filter((item) => item.productID === currentProduct.productID)
      .map((data) => data.id);

    const cartProduct = await Cart.useFetchUpdate({
      product: {
        amount: currentProduct.amount,
        productID: currentProduct.productID,
        id: cartId[0],
      },
      userToken,
    });

    productsArray[productIndex] = {
      amount: cartProduct.amount,
      productID: cartProduct.productID,
      id: cartProduct.id,
    };

    dispatch(cartAction.saveCart(productsArray));
  };
}

export function removeCart() {}
