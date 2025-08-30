import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CredentialsStateItem } from "@/redux/store/auth/auth.type";
import localStorageHandler from "@/utils/localStorage";

type CredentialsState = {
	credentials: CredentialsStateItem | null;
	errorMessage: string | null;
};

const initialState: CredentialsState = {
	credentials: null,
	errorMessage: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials(state, action) {
			state.credentials = action.payload;
		},
		logOut(state) {
			state.credentials = null;
			const storage = localStorageHandler("all");
			storage.delete([
				"addressState",
				"cartState",
				"customerState",
				"ordersState",
				"wishlistState",
			]);
		},

		writeErrorMessage(state, action) {
			state.errorMessage = action.payload;
		},
	},
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
