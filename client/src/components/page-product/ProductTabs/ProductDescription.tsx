import { FC } from 'react';
import classes from './ProductDescription.module.scss';
import { TextClassList } from '@/types/textClassList.enum';
import { ProductItem } from '@/types/product.types';

type ProductDescriptionProps = {
	productData: ProductItem;
};

const ProductDescription: FC<ProductDescriptionProps> = (props) => {
	const { productData } = props;

	return (
		<div className={classes.description}>
			<p className={TextClassList.REGULAR_18}>{productData.description}</p>
			<div className={classes['description__info']}>
				<div className="h7">Information</div>
				<ul className={classes['description__list']}>
					<li className={TextClassList.REGULAR_18}>text</li>
					<li className={TextClassList.REGULAR_18}>text</li>
					<li className={TextClassList.REGULAR_18}>text</li>
					<li className={TextClassList.REGULAR_18}>text</li>
				</ul>
			</div>
		</div>
	);
};

export default ProductDescription;
