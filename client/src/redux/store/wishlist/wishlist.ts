import localStorageHandler from "@/utils/localStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get } from "http";

export interface WishlistItemData {
	id?: number;
	productsId: number;
}

export type WishlistState = {
	productsArray: WishlistItemData[];
};

const storage = localStorageHandler<WishlistState>("wishlistState");

const initialState: WishlistState = {
	productsArray: [],
};

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,

	selectors: {
		getWishlistSelector: (state: WishlistState) => {
			const localStorageWishlist = storage.get();
			return localStorageWishlist ? localStorageWishlist : state;
		},
	},

	reducers: {
		saveWishlist(state, action: PayloadAction<WishlistItemData[]>) {
			if (action.payload || action.payload !== 0) {
				state.productsArray = action.payload;
				storage.set(state);
			}
		},
		removeWishlist(state, action: PayloadAction<{ productsId: number }>) {
			const productIndex = state.productsArray.findIndex(
				({ productsId }) => productsId === action.payload.productsId,
			);
			state.productsArray.splice(productIndex, 1);
			storage.set(state);
		},
	},
});

export const wishlistAction = wishlistSlice.actions;
export const { getWishlistSelector } = wishlistSlice.selectors;
export default wishlistSlice.reducer;
