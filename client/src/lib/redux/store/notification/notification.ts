import { createSelector, createSlice, Action } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: { notificationContent: null },
	reducers: {
		toggle(state, action) {
			state.notificationContent = action.payload;
		},
	},
});

export default notificationSlice.reducer;
export const notificationAction = notificationSlice.actions;
