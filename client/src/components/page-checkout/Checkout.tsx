'use client';

import classes from './Checkout.module.scss';
import CheckoutForms from './checkout-forms/CheckoutForms';
import CheckoutOrder from './CheckoutOrder';
import { useAppDispatch, useAppSelector } from '@/lib/redux/redux';
import { FormEvent, useEffect, useState } from 'react';
import Form from '../elements/form-component/FormComponent';
import ButtonCustom from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import { ordersUploadItem } from '@/utils/http/orders';
import { uploadOrders } from '@/lib/redux/store/orders/action';
import { useRouter, redirect } from 'next/navigation';
import { writeCustomerAction } from '@/lib/redux/store/customer/action';

export default function Checkout() {
	const [loading, setLoading] = useState<boolean>(true);
	const route = useRouter();
	const dispatch = useAppDispatch();
	const customer = useAppSelector((state) => state.customer.customerData);
	const address = useAppSelector((state) => state.address.address);
	const cart = useAppSelector((state) => state.cart.productsArray);

	useEffect(() => {
		if (customer && address && cart) {
			setLoading(false);
		}
	}, [customer, address, cart]);

	const submitHandler = (
		value: {
			data: ordersUploadItem & {
				firstName: string;
				lastName: string;
				phone: string;
			};
		},
		event: FormEvent<HTMLFormElement>
	) => {
		if (value.data.firstName && value.data.lastName && value.data.phone) {
			const customerFormData = new FormData();
			for (const key in value.data) {
				const typeKey = key as keyof typeof value.data;

				if (!customer) return;
				if (!Object.keys(customer).includes(typeKey)) return;
				if (customer[typeKey] !== value.data) {
					customerFormData.set(key, value.data[typeKey]);
				}
			}
			dispatch(writeCustomerAction(customerFormData));
		}

		const currentTarget = event.currentTarget as HTMLFormElement;
		const inputElements = currentTarget.getElementsByTagName('input');

		const ordersItem = new Object() as ordersUploadItem;

		for (const element of inputElements) {
			if (element.name.includes('Id')) {
				const key = element.name as keyof ordersUploadItem;

				if (element.value.split(',').length > 1) {
					const idArr = element.value.split(',').map(Number) as any;
					ordersItem[key] = idArr;
					continue;
				}

				ordersItem[key] = +element.value as any;
			}
		}

		dispatch(uploadOrders(ordersItem));
	};

	useEffect(() => {
		if (window.localStorage.getItem('order-status-code') === '200') {
			setTimeout(() => {
				route.push('/');
				window.localStorage.removeItem('order-status-code');
			}, 100);
		}
	}, [window.localStorage.getItem('order-status-code')]);

	if (cart.length === 0) {
		redirect('/');
	}

	return (
		<div className={`container ${classes.checkout}`}>
			{!loading ? (
				<>
					<h3 className={classes['checkout__header']}>Checkout</h3>
					<Form
						submitHandler={submitHandler}
						classe={classes['checkout__wrapper']}
					>
						<CheckoutForms />
						<CheckoutOrder />

						<ButtonCustom
							typeProperty="submit"
							styleSettings={{
								fill: 'SOLID',
								type: 'DEFAULT',
								color: 'DARK',
								size: 'MEDIUM',
								roundness: 'PILL',
							}}
						>
							Checkout
						</ButtonCustom>
					</Form>
				</>
			) : (
				<>Loading...</>
			)}
		</div>
	);
}
