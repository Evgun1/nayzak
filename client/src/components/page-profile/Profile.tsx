'use client';

import { ReactNode, useEffect, useState } from 'react';
import Orders from './orders/Orders';
import AccountDetails from './accaunt-details/AccountDetails';
import classes from './Profile.module.scss';
import Dashboard from './Dashboard';
import { ButtonCustom } from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import { useAppDispatch } from '@/lib/redux/redux';
import { useRouter, redirect } from 'next/navigation';
import { cartAction } from '@/lib/redux/store/cart/cart';
import Wishlist from './wishlist/Wishlist';
import Image from 'next/image';
import { logOutActive } from '@/lib/redux/store/auth/action';
import { useCookieGet } from '@/hooks/useCookie';
import dynamic from 'next/dynamic';
import { initCustomer } from '@/lib/redux/store/customer/action';
import { initWishlist } from '@/lib/redux/store/wishlist/action';
import Addresses from './addresses/Addresses';

type PageContentType = {
	label: string;
	content: () => ReactNode;
};

const MENU: PageContentType[] = [
	{
		label: 'Account details',
		content: () => <AccountDetails />,
	},
	{
		label: 'Addresses',
		content: () => <Addresses />,
	},
	{
		label: 'Wishlist',
		content: () => <Wishlist />,
	},
	{
		label: 'Orders',
		content: () => <Orders />,
	},
];

export default function Profile() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [tabAction, setTabAction] = useState(0);

	const btnLogOutHandler = () => {
		dispatch(logOutActive());
		dispatch(cartAction.cleanCart());
		router.push('/');
	};

	useEffect(() => {
		if (!useCookieGet('user-token')) {
			redirect('/');
		}
	}, [useCookieGet('user-token')]);

	return (
		<div className={classes.profile}>
			<h3>My account</h3>
			<div className={classes['profile--dashboard']}>
				<div className={classes['profile--dashboard-menu']}>
					<img
						className={classes['profile--menu-image']}
						src="https://placehold.co/400"
						alt="avatar"
					/>

					<ul className={classes['profile--menu-list']}>
						{MENU &&
							MENU.length > 0 &&
							MENU.map((data, index) => (
								<li key={index} className={classes['profile--menu-item']}>
									<ButtonCustom
										styleSettings={{
											type: 'TEXT',
											color: 'DARK',
											size: 'MEDIUM',
										}}
										onClick={() => setTabAction(index)}
										className={
											index === tabAction
												? classes['profile--btn-action']
												: classes['profile--btn']
										}
									>
										{data.label}
									</ButtonCustom>
								</li>
							))}
						<li className={classes['profile--menu-item']}>
							<ButtonCustom
								styleSettings={{
									type: 'TEXT',
									color: 'DARK',
									size: 'MEDIUM',
								}}
								className={classes['profile--btn']}
								onClick={btnLogOutHandler}
							>
								Logout
							</ButtonCustom>
						</li>
					</ul>
				</div>
				<div>
					{MENU.map((menuItem, index) => (
						<div key={index}>
							{index === tabAction ? menuItem.content() : <></>}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
