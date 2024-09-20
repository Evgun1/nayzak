import { configureStore } from "@reduxjs/toolkit";
import popup from "./store/popup/popup";
import cart from "./store/cart/cart";
import auth from "./store/auth/auth";
import wishlist from "./store/wishlist/wishlist";
import products from "./store/product/products";

const store = configureStore({
  reducer: {
    popup,
    cart,
    auth,
    wishlist,
    products,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
