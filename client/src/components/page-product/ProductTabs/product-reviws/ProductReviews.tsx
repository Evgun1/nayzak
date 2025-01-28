import { FC } from 'react';

import classes from './ProductReviews.module.scss';
import Rating from '@/components/elements/rating/Rating';
import { TextClassList } from '@/types/textClassList.enum';
import { ReviewItem } from '@/types/reviews.types';
import ButtonCustom from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import PreviewReview from './PreviewReview';

type ProductReviewsProps = {
	reviewArray: ReviewItem[];
	totalReviews: number;
};

const ProductReviews: FC<ProductReviewsProps> = (props) => {
	const { reviewArray, totalReviews } = props;

	return (
		<div className={classes.reviews}>
			<div className={classes['reviews__header']}>
				<h5 className={classes['reviews__header-title']}>Customer reviews</h5>
				<div className={classes['reviews__rating-wrapper']}>
					<div className={classes['reviews__rating']}>
						<Rating
							rating={reviewArray.map(({ rating }) => rating)}
							customClasses={classes['reviews__rating-rating']}
						/>
						<span
							className={`${TextClassList.REGULAR_12} ${classes['reviews__rating-label']}`}
						>
							{totalReviews} total Reviews
						</span>
					</div>

					<ButtonCustom
						styleSettings={{
							type: 'DEFAULT',
							color: 'LIGHT',
							size: 'SMALL',
							fill: 'OUTLINE',
							roundness: 'SHARP',
						}}
					>
						Write reviews
					</ButtonCustom>
				</div>
			</div>

			{reviewArray && reviewArray.length > 0 ? (
				<ul>
					{reviewArray.map((value, index) => (
						<li key={index}>
							<PreviewReview review={value} />
						</li>
					))}
				</ul>
			) : (
				<div className={classes['reviewCard']}>No reviews</div>
			)}
		</div>
	);
};

export default ProductReviews;
