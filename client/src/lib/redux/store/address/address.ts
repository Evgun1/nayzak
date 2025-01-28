import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AddressData {
	id?: number;
	city: string;
	street: string;
	postalCode: number;
}

type AddressState = {
	address: AddressData[];
	error?: null;
};

const initialState: AddressState = {
	address: [],
};

const addressSlice = createSlice({
	name: 'address',
	initialState,
	reducers: {
		uploadAddress(state, action: PayloadAction<AddressState>) {
			state.address = action.payload.address;
		},
		deleteAddress(state, action: PayloadAction<{ id: number }>) {
			const addressIndex = state.address.findIndex(
				(data) => data.id === action.payload.id
			);
			state.address.splice(addressIndex, 1);
		},
	},
});

export default addressSlice.reducer;
export const addressAction = addressSlice.actions;
