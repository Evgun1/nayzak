import { log } from "util";
import {
    appWishlistsDelete,
    appWishlistsInitPost,
    appWishlistsPost,
} from "@/utils/http/wihslists";
import { AppDispatch, RootState } from "../../store";
import { wishlistAction, WishlistItemData } from "./wishlist";
import { useCookieGet } from "@/hooks/useCookie";
import { useEffect, useState } from "react";

export function initWishlist() {
    return async function (dispatch: AppDispatch, getState: () => RootState) {
        const productsArray = [...getState().wishlist.productsArray];
        const customerID = getState().customer.customerData?.id;

        if (!customerID) return;

        try {
            const wishlist = await appWishlistsInitPost(customerID);

            if (!wishlist) return;
            productsArray.push(...wishlist);
            dispatch(wishlistAction.saveWishlist(productsArray));
        } catch (error) {
            console.log(error);
        }
    };
}

export function saveWishlist({ productID }: WishlistItemData) {
    return async function (dispatch: AppDispatch, getState: () => RootState) {
        const customerID = getState().customer.customerData?.id;

        if (!customerID) return;

        const productsWishlists = [...getState().wishlist.productsArray];

        const productsIndex = productsWishlists.findIndex(
            (product) => product.productID === productID
        );

        try {
            if (productsIndex === -1) {
                const result = await appWishlistsPost(
                    { productID },
                    customerID
                );
                productsWishlists.push(result);
            } else {
                const wishlistsID = productsWishlists.find(
                    (product) => product.productID === productID
                )?.id;

                if (!wishlistsID) return;

                await appWishlistsDelete(wishlistsID);

                dispatch(wishlistAction.removeWishlist({ productID }));
                productsWishlists.splice(productsIndex, 1);
            }

            dispatch(wishlistAction.saveWishlist(productsWishlists));
        } catch (error) {
            console.log(error);
        }
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

        try {
            await appWishlistsDelete(wishlistID);
            dispatch(wishlistAction.removeWishlist({ productID }));
        } catch (error) {
            console.log(error);
        }
    };
}
