import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItemData {
  id?: number;
  productID: number;
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
    removeWishlist(state, action: PayloadAction<{ productID: number }>) {
      const productIndex = state.productsArray.findIndex(
        ({ productID }) => productID === action.payload.productID
      );

      state.productsArray.splice(productIndex, 1);
    },
  },
});

export const wishlistAction = wishlistSlice.actions;
export default wishlistSlice.reducer;
