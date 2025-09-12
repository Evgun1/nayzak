import localStorageHandler from "@/tools/localStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { stat } from "fs";
import { ca } from "zod/v4/locales";

export interface CartItemData {
	id: number;
	productsId: number;
	amount: number;
}

export type CartState = {
	productsArray: CartItemData[];
	totalAmount: number;
};

const storage = localStorageHandler<CartState>("cartState");
const localStorageCart = storage.get();

const initialState: CartState = {
	productsArray: [],
	totalAmount: 0,
};

// const initialState: CartState = localStorageCart
// 	? localStorageCart
// 	: {
// 			productsArray: [],
// 			totalAmount: 0,
// 	  };

export const cartSlice = createSlice({
	name: "cart",
	initialState,

	selectors: {
		getCartSelector: (state: CartState) => {
			const storage = localStorageHandler<CartState>("cartState");
			const localCart = storage.get();
			return localCart ? localCart : state;
		},
	},

	reducers: {
		saveCart(state, action: PayloadAction<CartItemData[]>) {
			if (action.payload && action.payload.length) {
				state.productsArray = action.payload;
				state.totalAmount = action.payload.length;
				const storage = localStorageHandler<CartState>("cartState");

				storage.set(state);
			}
		},

		removeCart(state, action: PayloadAction<number | number[]>) {
			const suggestRemoveCartMap = new Map<
				boolean,
				(data: number | number[]) => void
			>()
				.set(true, (productsId: number[] | number) => {
					for (const element of productsId as number[]) {
						const productIndex = state.productsArray.findIndex(
							({ productsId }) => productsId === element,
						);

						state.productsArray.splice(productIndex, 1);
						state.totalAmount = state.productsArray.length;
					}
				})
				.set(false, (productsId: number[] | number) => {
					const productIndex = state.productsArray.findIndex(
						({ productsId }) => productsId === productsId,
					);

					state.productsArray.splice(productIndex, 1);
					state.totalAmount = state.productsArray.length;
				});

			for (const [key, value] of suggestRemoveCartMap.entries()) {
				if (key === Array.isArray(action.payload)) {
					value(action.payload);
				}
			}
			const storage = localStorageHandler<CartState>("cartState");
			storage.set(state);
			const localStorage = storage.get();
			state = localStorage ? localStorage : state;
		},

		cleanCart(state) {
			state.productsArray.splice(0);
			state.totalAmount = 0;
			const storage = localStorageHandler<CartState>("cartState");
			storage.set(state);
			const localStorage = storage.get();
			state = localStorage ? localStorage : state;
		},
	},
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;
