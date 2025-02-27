'use client';

import ChangePassword from './accaunt-detail-forms/ChangePassword';

import classes from './AccountDetails.module.scss';
import DetailInfo from '@/components/page-profile/accaunt-details/accaunt-detail-forms/DetailInfo';

export default function AccountDetails() {
	return (
		<div className={classes['accountDetails--container']}>
			<DetailInfo />
			<ChangePassword />
		</div>
	);
}
