import { FC } from 'react';

import classes from './ProductInfo.module.scss';
import { TextClassList } from '@/types/textClassList.enum';

const ProductInfo: FC = () => {
	const INFO_ARR = [
		{
			label: 'SIZE',
			value: 'Value',
		},
		{
			label: 'COLOR',
			value: 'Value',
		},
		{
			label: 'WEIGHT',
			value: 'Value',
		},
	];

	return (
		<div className={classes['info']}>
			{INFO_ARR.map((data, i) => (
				<InfoPreview key={i} label={data.label} value={data.value} />
			))}
		</div>
	);
};

const InfoPreview = ({ label, value }: { value: string; label: string }) => {
	return (
		<>
			<span className={`${TextClassList.SEMIBOLD_18} ${classes['info__item']}`}>
				{label}
			</span>
			<span className={`${TextClassList.REGULAR_18} ${classes['info__item']}`}>
				{value}
			</span>
		</>
	);
};

export default ProductInfo;
