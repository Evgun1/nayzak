import { FC } from 'react';
import classes from './PopupLoading.module.scss';

const PopupLoading = () => {
	return (
		<div className={classes['loading']}>
			<div className={classes['loading__spinner']}></div>
		</div>
	);
};

export default PopupLoading;
