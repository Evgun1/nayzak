import { configureStore } from "@reduxjs/toolkit";
import popup from "./store/popup/popup";
import cart from "./store/cart/cart";
import auth from "./store/auth/auth";
import wishlist from "./store/wishlist/wishlist";
import customer from "./store/customer/customer";
import address from "./store/address/address";
import orders from "./store/orders/orders";
import notification from "./store/notification/notification";

const store = configureStore({
    reducer: {
        popup,
        cart,
        auth,
        wishlist,
        customer,
        address,
        orders,
        notification,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
