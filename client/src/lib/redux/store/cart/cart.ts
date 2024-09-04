import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItemData {
  id?: number;
  productID: number;
  amount: number;
}

type CartState = {
  productsArray: CartItemData[];
  totalAmount: number;
};

const initialState: CartState = {
  productsArray: [],
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveCart(state, action: PayloadAction<CartItemData[]>) {
      if (action.payload && action.payload.length) {
        state.productsArray = action.payload;
        state.totalAmount = action.payload.length;
      }
    },

    removeCart(state, action: PayloadAction<number>) {
      const productIndex = state.productsArray.findIndex(
        ({ productID }) => productID === action.payload
      );

      state.productsArray.splice(productIndex, 1);
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;
