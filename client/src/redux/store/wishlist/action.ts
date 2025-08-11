import {
	appWishlistsDelete,
	appWishlistsInitGet,
	appWishlistsPost,
} from "@/lib/api/wishlist";
import { AppDispatch, RootState } from "../../store";
import { wishlistAction, WishlistItemData } from "./wishlist";
import { appCookieGet } from "@/lib/api/cookie";

export function initWishlist() {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const productsArray = [...getState().wishlist.productsArray];
		const token = appCookieGet("user-token");
		if (!token) return;

		try {
			const wishlist = await appWishlistsInitGet(token);

			if (!wishlist) return;

			productsArray.push(...wishlist);
			dispatch(wishlistAction.saveWishlist(productsArray));
		} catch (error) {
			console.log(error);
		}
	};
}

export function saveWishlist({ productsId }: WishlistItemData) {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const userToken = await appCookieGet("user-token");
		if (!userToken) return;

		const productsWishlists = [...getState().wishlist.productsArray];

		const productsIndex = productsWishlists.findIndex(
			(product) => product.productsId === productsId,
		);

		try {
			if (productsIndex === -1) {
				const result = await appWishlistsPost(
					{ productsId },
					userToken,
				);

				if (!result) return;
				productsWishlists.push(result);
			} else {
				const wishlistsID = productsWishlists.find(
					(product) => product.productsId === productsId,
				)?.id;

				if (!wishlistsID) return;

				await appWishlistsDelete(wishlistsID);

				dispatch(wishlistAction.removeWishlist({ productsId }));
				productsWishlists.splice(productsIndex, 1);
			}

			dispatch(wishlistAction.saveWishlist(productsWishlists));
		} catch (error) {
			console.log(error);
		}
	};
}

export function removeWishlist(productsId: number) {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const wishlistID = getState()
			.wishlist.productsArray.filter(
				(product) => product.productsId === productsId,
			)
			.map((data) => data.id)[0];

		if (!wishlistID) return;

		try {
			await appWishlistsDelete(wishlistID);
			dispatch(wishlistAction.removeWishlist({ productsId }));
		} catch (error) {
			console.log(error);
		}
	};
}
