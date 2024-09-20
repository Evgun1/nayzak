import {
  appWishlistsDelet,
  appWishlistsInitGet,
  appWishlistsPost,
} from "@/utils/http/wihslists";
import { AppDispatch, RootState } from "../../store";
import { wishlistAction, WishlistItemData } from "./wishlist";
import { useCookiGet } from "@/hooks/useCookie";
import { useEffect, useState } from "react";

export function initWishlist() {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const productsArray = [...getState().wishlist.productsArray];
    const userToken = useCookiGet("user-tokenn");
    if (!userToken) return;

    const wishlist = await appWishlistsInitGet(userToken);

    productsArray.push(...wishlist);

    dispatch(wishlistAction.saveWishlist(productsArray));
  };
}

export function saveWishlist({ productID }: WishlistItemData) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const userToken = useCookiGet("user-tokenn");
    if (!userToken) return;

    const productsWishlists = [...getState().wishlist.productsArray];

    const productsIndex = productsWishlists.findIndex(
      (product) => product.productID === productID
    );

    if (productsIndex === -1) {
      const result = await appWishlistsPost({ productID }, userToken);
      productsWishlists.push(result);
    } else {
      const wishlistsID = productsWishlists.find(
        (product) => product.productID === productID
      )?.id;

      if (!wishlistsID) return;

      await appWishlistsDelet(wishlistsID);

      dispatch(wishlistAction.removeWishlist({ productID }));
      productsWishlists.splice(productsIndex, 1);
    }

    dispatch(wishlistAction.saveWishlist(productsWishlists));
  };
}

export function removeWishlist(productID: number) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const wishlistID = getState()
      .wishlist.productsArray.filter(
        (product) => product.productID === productID
      )
      .map((data) => data.id)[0];

    if (!wishlistID) return;

    await appWishlistsDelet(wishlistID);
    dispatch(wishlistAction.removeWishlist({ productID }));
  };
}
