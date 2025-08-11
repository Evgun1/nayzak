import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItemData {
	id?: number;
	productsId: number;
}

type WishlistState = {
	productsArray: WishlistItemData[];
};

const initialState: WishlistState = {
	productsArray: [],
};

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		saveWishlist(state, action: PayloadAction<WishlistItemData[]>) {
			if (action.payload || action.payload !== 0) {
				state.productsArray = action.payload;
			}
		},
		removeWishlist(state, action: PayloadAction<{ productsId: number }>) {
			const productIndex = state.productsArray.findIndex(
				({ productsId }) => productsId === action.payload.productsId,
			);

			state.productsArray.splice(productIndex, 1);
		},
	},
});

export const wishlistAction = wishlistSlice.actions;
export default wishlistSlice.reducer;
