'use client';

import { useAppSelector } from '@/lib/redux/redux';
import { OrdersPreview } from './OrdersPreview';
import { useEffect, useState } from 'react';
import { OrdersItem } from '@/types/orders.types';

export default function Orders() {
	const [orders, setOrders] = useState<Partial<OrdersItem>[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const ordersSelector = useAppSelector((state) => state.orders.ordersData);

	useEffect(() => {
		if (ordersSelector) {
			setOrders(ordersSelector);
			setLoading(false);
		}
	}, [ordersSelector]);

	return (
		<div>
			{!loading ? (
				<>
					{orders && orders.length > 0 ? (
						<ul>
							{orders.map((order, index) => (
								<li key={index}>{<OrdersPreview order={order} />}</li>
							))}
						</ul>
					) : (
						<div> The orders is empty</div>
					)}
				</>
			) : (
				<>Loading...</>
			)}
		</div>
	);
}
