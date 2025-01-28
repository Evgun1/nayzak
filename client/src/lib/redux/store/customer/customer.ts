import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CustomerItem {
	id?: number;
	firstName: string;
	lastName: string;
	phone: number;
	// displayName: string;
}

type CustomerState = {
	customerData: CustomerItem | null;
};

const initialState: CustomerState = {
	customerData: null,
};

const customerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {
		setCustomer(state, action: PayloadAction<CustomerItem>) {
			state.customerData = action.payload;
		},
	},
});

export default customerSlice.reducer;
export const customerAction = customerSlice.actions;
