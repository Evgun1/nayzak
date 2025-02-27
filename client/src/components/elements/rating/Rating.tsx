'use client';

import IconsIdList from '../icons/IconsIdList';
import DisplayIcon from '../icons/displayIcon';
import { ReviewItem } from '../../../types/reviews.types';

import classes from './Rating.module.scss';
import { useEffect, useState } from 'react';

type RatingProps = {
	rating: number[] | number;
	customClasses?: string;
};

export default function Rating(props: RatingProps) {
	const { customClasses, rating } = props;

	const [newRating, setNewRating] = useState<number>(0);

	useEffect(() => {
		if (Array.isArray(rating)) {
			if (rating.length > 0) {
				const currentRating = Math.round(
					rating.reduce((acc, cur) => acc + cur) / rating.length
				);
				setNewRating(currentRating);
			}
			return;
		}

		setNewRating(rating);
	}, [rating]);

	const iconsArray: React.JSX.Element[] = [];

	for (let index = 1; index <= 5; index++) {
		iconsArray.push(
			(() => {
				const className = index <= newRating ? 'star star_active' : 'star';
				return (
					<DisplayIcon
						key={index}
						iconName={IconsIdList.STAR}
						className={`${className} ${classes.icon}`}
					/>
				);
			})()
		);
	}

	return (
		<div
			className={`${classes.rating} ${
				customClasses ? ` ${customClasses}` : ''
			}`}
		>
			{iconsArray}
		</div>
	);
}
