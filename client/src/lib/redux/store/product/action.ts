import { AppDispatch, RootState } from '../../store';
import { productsAction } from './products';

export function updateProducts<T>(
	currentDataArray: T[],
	currentTotalCount: number
) {
	return async function (dispatch: AppDispatch, getState: () => RootState) {
		const { count, totalCount, dataArray } = getState().products;

		dispatch(
			productsAction.saveData({
				dataArray: dataArray.concat(currentDataArray),
				count: count + currentDataArray.length,
				totalCount: currentTotalCount,
			})
		);
	};
}

// interface FetchHandlerItem<T, P = void> {
//   fetchHandler: ;
// }

interface DataItem<T> {
	dataArray: T[];
	totalCount: number;
}

type InitDataProps<T> = {
	data: DataItem<T>;
	limit?: number;
};

export function initData<T>({
	data: { dataArray, totalCount },
	limit,
}: InitDataProps<T>) {
	return async function (dispatch: AppDispatch) {
		const urlSearchParams = new URLSearchParams();
		// const getListType = searchParams.get("list_type");

		// const listTypeLimits = new Map([
		//   ["default", "15"],
		//   [null, "15"],
		//   ["five_grid", "15"],
		//   ["four_grid", "12"],
		//   ["three_grid", "9"],
		//   ["two_grid", "8"],
		//   ["list", "8"],
		// ]);

		// limit
		//   ? urlSearchParams.set("limit", limit.toString())
		//   : urlSearchParams.set("limit", listTypeLimits.get(getListType) as string);

		dispatch(
			productsAction.saveData({
				count: dataArray.length,
				dataArray: dataArray,
				totalCount: totalCount,
			})
		);
	};
}
