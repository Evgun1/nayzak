import { ProductItem } from '@/types/product.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DataState<T> = {
	dataArray: Array<T>;
	count: number;
	totalCount: number;
};

const initialState: DataState<any> = {
	dataArray: [],
	count: 0,
	totalCount: 0,
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		saveData<T>(state: DataState<T>, action: PayloadAction<DataState<T>>) {
			const { dataArray, totalCount, count } = action.payload;

			if (dataArray && dataArray.length > 0) {
				state.dataArray = dataArray;
				state.count = count;
				state.totalCount = totalCount;
			}
		},
	},
});

export default productsSlice.reducer;
export const productsAction = productsSlice.actions;
