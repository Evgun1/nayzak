import { configureStore } from "@reduxjs/toolkit";
import popup from "./store/popup/popup";
import cart from "./store/cart/cart";

const store = configureStore({
  reducer: {
    popup,
    cart,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
