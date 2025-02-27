import { configureStore } from "@reduxjs/toolkit";
import products from "./store/products/products.ts";

export const store = configureStore({
	reducer: {
		products,
	},
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
