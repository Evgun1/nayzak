import {
  useFetchWishlistInit,
  useFetchWishlistRemove,
  useFetchWishlistSave,
} from "@/hooks/useFethcWishlisths";
import { AppDispatch, RootState } from "../../store";
import { wishlistAction, WishlistItemData } from "./wishlist";
import { useCookiGet } from "@/hooks/useCookie";

export function initWishlist() {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const productsArray = [...getState().wishlist.productsArray];
    const userToken = useCookiGet("user-tokenn");
    if (!userToken) return;

    const wishlist = await useFetchWishlistInit(userToken);

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
      const result = await useFetchWishlistSave({ productID }, userToken);
      productsWishlists.push(result);
    } else {
      const wishlistsID = productsWishlists.find(
        (product) => product.productID === productID
      )?.id;

      if (!wishlistsID) return;

      await useFetchWishlistRemove(wishlistsID);

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

    await useFetchWishlistRemove(wishlistID);
    dispatch(wishlistAction.removeWishlist({ productID }));
  };
}
