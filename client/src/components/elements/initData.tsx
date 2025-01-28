'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/redux';
import { initAddress } from '@/lib/redux/store/address/action';
import { initAuth } from '@/lib/redux/store/auth/action';
import { initCart } from '@/lib/redux/store/cart/action';
import { initCustomer } from '@/lib/redux/store/customer/action';
import { initOrders } from '@/lib/redux/store/orders/action';
import { initWishlist } from '@/lib/redux/store/wishlist/action';
import { appCookieGet } from '@/utils/http/cookie';
import { useEffect } from 'react';

export default function InitData() {
	const dispatch = useAppDispatch();
	const customer = useAppSelector((state) => state.customer.customerData);

	const token = appCookieGet('user-token');

	useEffect(() => {
		dispatch(initAuth());
		dispatch(initCustomer());
	}, [dispatch, token]);

	useEffect(() => {
		dispatch(initAddress());
		dispatch(initWishlist());
		dispatch(initCart());
		dispatch(initOrders());
	}, [dispatch, customer]);

	return <></>;
}
