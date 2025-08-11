import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItemData {
	id?: number;
	productsId: number;
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
		},

		cleanCart(state) {
			state.productsArray.splice(0);
			state.totalAmount = 0;
		},
	},
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;
