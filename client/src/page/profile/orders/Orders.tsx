"use client";

import { useAppSelector } from "@/redux/redux";
import { OrdersPreview } from "./OrdersPreview";
import classes from "./Orders.module.scss";
import { TextClassList } from "@/types/textClassList.enum";

export default function Orders() {
	const ordersSelector = useAppSelector((state) => state.orders.ordersData);

	if (!ordersSelector || ordersSelector.length === 0) {
		<div
			className={`${TextClassList.REGULAR_22} ${classes["orders__message"]}`}
		>
			The orders is empty
		</div>;
	}

	return ordersSelector.map((order, index) => (
		<OrdersPreview
			key={index}
			order={order}
		/>
	));
}
