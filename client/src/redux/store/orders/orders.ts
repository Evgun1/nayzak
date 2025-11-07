import localStorageHandler from "../../../tools/localStorage";
import { IOrder } from "../../../types/orders.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrdersData extends IOrder {}

export type OrderState = {
	ordersData: OrdersData[];
};

const storage = localStorageHandler("ordersState");

const initialState: OrderState = {
	ordersData: [],
};

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		uploadOrders(state, action: PayloadAction<OrdersData[]>) {
			if (action.payload && action.payload.length) {
				state.ordersData = action.payload;

				storage.set(state);
			}
		},
	},
});

export default ordersSlice.reducer;
export const ordersAction = ordersSlice.actions;
