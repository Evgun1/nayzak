import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CredentialsStateItem } from '@/lib/redux/store/auth/credentials.type';

type CredentialsState = {
	credentials: CredentialsStateItem | null;
	errorMessage: string | null;
};

const initialState: CredentialsState = {
	credentials: null,
	errorMessage: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials(state, action) {
			state.credentials = action.payload;
		},
		logOut(state) {
			state.credentials = null;
		},

		writeErrorMessage(state, action) {
			state.errorMessage = action.payload;
		},
	},
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
