import { createSlice } from "@reduxjs/toolkit";

interface CartItemData {
  id: number;
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
    saveCart(state, action) {},
  },
});

export const { saveCart } = cartSlice.actions;

export default cartSlice.reducer;
