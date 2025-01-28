'use client';

import classes from './actions.module.scss';

import { useAppDispatch, useAppSelector } from '@/lib/redux/redux';

import { useEffect } from 'react';
import PopupSearch from '../popup-search/PopupSearch';
import { popupActions } from '@/lib/redux/store/popup/popup';
import PopupAuth from '../popup-auth/PopupAuth';
import { initAuth } from '@/lib/redux/store/auth/action';
import { initCart } from '@/lib/redux/store/cart/action';
import { initWishlist } from '@/lib/redux/store/wishlist/action';
import PopupError from '../popup-error/PopupError';
import { useCookieGet } from '@/hooks/useCookie';
import { ButtonCustom } from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import { appCookieGet } from '@/utils/http/cookie';
import LinkCustom from '@/lib/ui/custom-elements/link-custom/LinkCustom';

export default function Actions() {
	const dispatch = useAppDispatch();
	const cartAmount = useAppSelector((selector) => selector.cart.totalAmount);
	const userData = useAppSelector((selector) => selector.auth.credentials);

	const token = appCookieGet('user-token');

	const btnAuthHandler = () => {
		dispatch(popupActions.toggle(<PopupAuth />));
	};
	const btnSearchHandler = () => dispatch(popupActions.toggle(<PopupSearch />));
	const btnClickCart = () => {
		dispatch(
			popupActions.toggle(<PopupError title="You need to log in to the site" />)
		);
	};

	if (userData) {
		setTimeout(() => {
			dispatch(popupActions.toggle(null));
		}, 500);
	}

	// useEffect(() => {
	//   dispatch(checkAuth());
	//   dispatch(initWishlist());
	//   dispatch(initCart());
	// }, [dispatch, token]);

	return (
		<div className={classes.actions}>
			<ButtonCustom
				styleSettings={{
					type: 'TEXT',
					color: 'DARK',
					size: 'LARGE',
					icon: { left: 'SEARCH' },
				}}
				className={classes['actions--btn']}
				onClick={btnSearchHandler}
			/>

			<LinkCustom
				href={{ endpoint: userData !== null ? '/profile' : '#' }}
				onClick={userData !== null ? () => {} : btnAuthHandler}
				styleSettings={{
					roundness: 'ROUNDED',
					color: 'DARK',
					icon: { left: 'USER' },
					type: 'TEXT',
					size: 'LARGE',
				}}
				className={classes['actions--btn']}
			/>

			<LinkCustom
				href={{ endpoint: !userData ? '#' : '/cart' }}
				styleSettings={{
					roundness: 'ROUNDED',
					color: 'DARK',
					icon: { left: 'CART' },
					type: 'TEXT',
					size: 'LARGE',
				}}
				className={classes['actions--btn']}
			>
				{cartAmount !== 0 && (
					<span className={classes['actions--btn-amount']}>{cartAmount}</span>
				)}
			</LinkCustom>
		</div>
	);
}
