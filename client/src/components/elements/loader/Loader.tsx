'use client';

import { ButtonCustom } from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import { FC, ReactNode } from 'react';
import classes from './productList.module.scss';

type LoaderProps = {
	children: ReactNode;
	totalCount: number;
	count: number;
	style: any;
	btnClickHandler: () => void;
};

const Loader: FC<LoaderProps> = ({
	count,
	totalCount,
	children,
	btnClickHandler,
	style,
}) => {
	if (!children) return;

	return (
		<div>
			<ul className={`${style} ${classes.grid}`}>{children}</ul>
			{totalCount > count && (
				<ButtonCustom
					onClick={btnClickHandler}
					styleSettings={{
						fill: 'SOLID',
						size: 'MEDIUM',
						type: 'DEFAULT',
						color: 'DARK',
						roundness: 'SHARP',
					}}
				>
					Load More
				</ButtonCustom>
			)}
		</div>
	);
};

export default Loader;
