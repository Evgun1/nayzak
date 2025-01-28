import Link from 'next/link';
import Price from '../price/Price';

import classes from './ProductsPreviewDefault.module.scss';
import Rating from '../rating/Rating';
import { ButtonClassList } from '@/types/buttonClassList.enum';
import { TextClassList } from '@/types/textClassList.enum';
import { FC } from 'react';
import { ProductPreviewTypes } from './ProductPreview.types';

const ProductPreviewDefault: FC<ProductPreviewTypes> = (props) => {
	const {
		href,
		reviewsArray,
		src,
		rating,
		style,
		stylePrice,
		product: { title, price, mainPrice },
	} = props;

	return (
		<Link className={`${style} ${classes['preview']}`} href={href}>
			<div className={classes['preview__img-wrapper']}>
				<img className={classes['preview__img']} src={src} alt="product" />
			</div>
			<div className={classes['preview__info-wrapper']}>
				{rating && <Rating rating={reviewsArray.map(({ rating }) => rating)} />}
				<div className={`${ButtonClassList.BUTTON_SMALL}`}>{title}</div>
				<Price
					style={stylePrice}
					price={price}
					mainPrice={mainPrice}
					classBasePrice={TextClassList.SEMIBOLD_14}
					classOldPrice={TextClassList.REGULAR_14}
				/>
			</div>
		</Link>
	);
};

export default ProductPreviewDefault;
