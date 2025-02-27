import { appReviewsProductGet } from '@/utils/http/reviews';
import { AppDispatch, RootState } from '../../store';

export const initReviewsByProduct = (params: string) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		try {
			const reviews = await appReviewsProductGet(params);
		} catch (error) {
			console.log(error);
		}
	};
};
