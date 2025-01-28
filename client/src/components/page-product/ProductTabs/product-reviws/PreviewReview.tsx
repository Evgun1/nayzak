import Rating from '@/components/elements/rating/Rating';
import { ReviewItem } from '@/types/reviews.types';
import { FC } from 'react';

import classes from './PreviewReview.module.scss';
import { TextClassList } from '@/types/textClassList.enum';

type PreviewReviewProps = {
	review: ReviewItem;
};

const PreviewReview: FC<PreviewReviewProps> = (props) => {
	const { review } = props;

	const date = new Date(review.createdAt).toLocaleString('eu-us', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	});

	return (
		<div className={classes['review']}>
			<div className={classes['review__user']}>
				<div className={classes['review__user-avatar']}>
					<img src="https://placehold.co/76" alt="" />
				</div>
				<div>
					<div className={classes['review__user-header']}>
						<span className={`${TextClassList.SEMIBOLD_18}`}>User Name</span>
						<span className={TextClassList.REGULAR_14}>{date}</span>
					</div>
					<Rating
						customClasses={classes['review__user-rating']}
						rating={review.rating}
					/>
				</div>
			</div>
			<p
				className={`${TextClassList.REGULAR_18} ${classes.reviewCard__paragraph}`}
			>
				{review.text}
			</p>
		</div>
	);
};

export default PreviewReview;
