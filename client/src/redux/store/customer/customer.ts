import localStorageHandler from "@/tools/localStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CustomerItem {
	id?: number;
	firstName: string;
	lastName: string;
	phone: number;
	// displayName: string;
}

export type CustomerState = {
	customerData: CustomerItem | null;
};

const storage = localStorageHandler<CustomerState>("customerState");

const localStorageCustomer = storage.get();

// const initialState: CustomerState = localStorageCustomer
// 	? JSON.parse(localStorageCustomer)
// 	: ;

const initialState: CustomerState = {
	customerData: null,
};

const customerSlice = createSlice({
	name: "customer",
	initialState,
	reducers: {
		setCustomer(state, action: PayloadAction<CustomerItem>) {
			state.customerData = action.payload;
			storage.set(state);
		},
	},
});

export default customerSlice.reducer;
export const customerAction = customerSlice.actions;
