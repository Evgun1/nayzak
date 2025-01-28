import { FC } from 'react';

import classes from './ProductInfo.module.scss';
import { TextClassList } from '@/types/textClassList.enum';

const ProductInfo: FC = () => {
	return (
		<div className={classes['info']}>
			<span
				className={`${TextClassList.SEMIBOLD_18} ${classes['info__title']}`}
			>
				SIZE
			</span>
			<span className={`${TextClassList.REGULAR_18} ${classes['info__value']}`}>
				Value
			</span>

			<span
				className={`${TextClassList.SEMIBOLD_18} ${classes['info__title']}`}
			>
				COLOR
			</span>
			<span className={`${TextClassList.REGULAR_18} ${classes['info__value']}`}>
				Value
			</span>

			<span
				className={`${TextClassList.SEMIBOLD_18} ${classes['info__title']}`}
			>
				WEIGHT
			</span>
			<span className={`${TextClassList.REGULAR_18} ${classes['info__value']}`}>
				Value
			</span>
		</div>
	);
};

export default ProductInfo;
