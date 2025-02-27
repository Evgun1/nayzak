import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initData } from '../product/action';
import { ReviewItem } from '@/types/reviews.types';

type InitialStateItem = {
	reviews: ReviewItem[];
};

const initialState: InitialStateItem = {
	reviews: [],
};

const reviewSlice = createSlice({
	name: 'review',
	initialState,
	reducers: {
		uploadData(state, action: PayloadAction<ReviewItem[]>) {
			if (action.payload.length > 0) {
				state.reviews = action.payload;
			}
		},
	},
});

export default reviewSlice.reducer;
export const reviewAction = reviewSlice.actions;
