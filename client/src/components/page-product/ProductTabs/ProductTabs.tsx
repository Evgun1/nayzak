'use client';

import { useEffect, useState } from 'react';
import classes from './ProductTabs.module.scss';
import { ProductItem } from '@/types/product.types';
import { TextClassList } from '@/types/textClassList.enum';
import Rating from '@/components/elements/rating/Rating';
import { ReviewItem } from '@/types/reviews.types';
import ProductDescription from './ProductDescription';
import ProductInfo from './ProductInfo';
import ProductReviews from './product-reviws/ProductReviews';
import ButtonCustom from '@/lib/ui/custom-elements/button-custom/ButtonCustom';

type ProductTabProps = {
	productData: ProductItem;
	reviewArray: ReviewItem[];
	totalReviews: number;
};

const TABLES = [
	{
		labels: 'Description',
		content: ({ productData }: { productData: ProductItem }) => (
			<ProductDescription productData={productData} />
		),
	},
	{ labels: 'Additional Info', content: () => <ProductInfo /> },
	{
		labels: 'Reviews',
		content: ({
			reviewArray,
			totalReviews,
		}: {
			reviewArray: ReviewItem[];
			totalReviews: number;
		}) => (
			<ProductReviews reviewArray={reviewArray} totalReviews={totalReviews} />
		),
	},
];

export default function ProductTabs({
	productData,
	reviewArray,
	totalReviews,
}: ProductTabProps) {
	const [tabAction, setTabAction] = useState<number>(0);

	return (
		<div className={classes.tabs}>
			<div className={classes.tabs__menu}>
				{TABLES &&
					TABLES.length > 0 &&
					TABLES.map((val, i) => (
						<ButtonCustom
							key={i}
							styleSettings={{
								color: 'DARK',
								type: 'TEXT',
								size: 'LARGE',
							}}
							className={tabAction === i ? classes.tab_action : ''}
							children={val.labels}
							onClick={() => setTabAction(i)}
						/>
					))}
			</div>
			<div className={classes.tabs__info}>
				{TABLES &&
					TABLES.length &&
					TABLES.map((val, i) => (
						<div key={i}>
							{i === tabAction &&
								val.content({ productData, reviewArray, totalReviews })}
						</div>
					))}
			</div>
		</div>
	);
}
