import localStorageHandler from "@/tools/localStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {} from "redux";

export interface AddressData {
	id?: number;
	city: string;
	street: string;
	postalCode: number;
}

export type AddressState = {
	address: AddressData[];
	error?: null;
};

const storage = localStorageHandler<AddressState>("addressState");

const initialState: AddressState = {
	address: [],
};

const addressSlice = createSlice({
	name: "address",
	initialState,
	reducers: {
		uploadAddress(state, action: PayloadAction<AddressState>) {
			state.address = action.payload.address;

			storage.set(state);
		},
		deleteAddress(state, action: PayloadAction<{ id: number }>) {
			const addressIndex = state.address.findIndex(
				(data) => data.id === action.payload.id,
			);
			state.address.splice(addressIndex, 1);
			storage.set(state);
		},
	},
});

export default addressSlice.reducer;
export const addressAction = addressSlice.actions;
