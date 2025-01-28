import { OrdersItem } from '@/types/orders.types';
import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrdersData extends Partial<OrdersItem> {}

type InitialState = {
	ordersData: OrdersData[];
};

const initialState: InitialState = {
	ordersData: [],
};

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		uploadOrders(state, action: PayloadAction<OrdersData[]>) {
			if (action.payload && action.payload.length) {
				state.ordersData = action.payload;
			}
		},
	},
});

export default ordersSlice.reducer;
export const ordersAction = ordersSlice.actions;
