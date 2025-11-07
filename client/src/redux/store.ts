import { configureStore } from "@reduxjs/toolkit";
import popup from "./store/popup/popup";
import cart, { CartState } from "./store/cart/cart";
import auth from "./store/auth/auth";
import wishlist from "./store/wishlist/wishlist";
import customer, { CustomerState } from "./store/customer/customer";
import address, { AddressState } from "./store/address/address";
import orders, { OrderState } from "./store/orders/orders";
import notification from "./store/notification/notification";
import localStorageHandler from "@/tools/localStorage";

const storageCart = localStorageHandler("cartState");
const storageWishlist = localStorageHandler("wishlistState");
const storageAddress = localStorageHandler("addressState");
const storageOrder = localStorageHandler("ordersState");
const storageCustomer = localStorageHandler("customerState");

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
	preloadedState: {
		cart: storageCart.get() ?? { productsArray: [], totalAmount: 0 },
		wishlist: storageWishlist.get() ?? { productsArray: [] },
		address: storageAddress.get() ?? { address: [] },
		orders: storageOrder.get() ?? { ordersData: [] },
		customer: storageCustomer.get() ?? { customerData: null },
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
