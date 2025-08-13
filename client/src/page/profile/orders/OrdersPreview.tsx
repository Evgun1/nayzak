"use client";

import { IOrder } from "@/types/orders.types";
import { TextClassList } from "@/types/textClassList.enum";
import classes from "./OrdersPreview.module.scss";
import { useCallback, useEffect, useState } from "react";
import { appOneProductGet } from "@/lib/api/products";
import { AddressItem } from "@/types/addresses.types";
import { CustomerItem } from "@/types/customer.types";
import Image from "next/image";
import { useAppSelector } from "@/redux/redux";
import { ProductDetails } from "@/types/product/productDetails";
import Accordion from "@/ui/accordion/Accordion";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";

export const OrdersPreview = (props: { order: Partial<IOrder> }) => {
	const { order } = props;

	const customerState = useAppSelector(
		(state) => state.customer.customerData,
	);
	const addressesState = useAppSelector((state) => state.address.address);

	const [product, setProduct] = useState<
		ProductDetails & { discountPrice: number }
	>();
	const [address, setAddress] = useState<AddressItem>();
	const [customer, setCustomer] = useState<CustomerItem>();

	const dateObject = new Date(`${order.createdAt}`);

	const date = dateObject.toLocaleString("en-us", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
	const orderStatus =
		(order.status?.charAt(0).toLocaleUpperCase() as string) +
		(order.status?.slice(1) as string);

	const getData = useCallback(async () => {
		if (!order.productsId) return;
		const productFetch = await appOneProductGet({
			slug: order.productsId.toString(),
		});
	}, [order, addressesState]);

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<Accordion className={classes["orders-preview"]}>
			<Accordion.Header className={classes["orders-preview__header"]}>
				<span className={`${TextClassList.SEMIBOLD_18} `}>
					#{order.id}
				</span>
				<div className={`${TextClassList.REGULAR_18} `}>{date}</div>
				<div className={`${TextClassList.REGULAR_18} `}>
					{orderStatus}
				</div>
				<div className={`${TextClassList.REGULAR_18} `}>
					${order.price}
				</div>
				<ButtonCustom
					styleSettings={{
						color: "DARK",
						type: "TEXT",
						size: "MEDIUM",
						icon: { left: "CARET_DOWN" },
					}}
				/>
			</Accordion.Header>
			{/* <Accordion.Body>
				<div className={classes["orders-preview__info"]}>
					<div
						className={`${classes["orders-preview__product-wrap"]}`}
					>
						<LinkCustom
							className={`${classes["orders-preview__product"]}`}
							styleSettings={{
								type: "TEXT",
								color: "DARK",
								roundness: "PILL",
								size: "SMALL",
							}}
							href={{
								endpoint: `product/${product?.title.replaceAll(
									" ",
									"_",
								)}`,
							}}
						>
							<div
								className={
									classes["orders-preview__image-wrap"]
								}
							>
								<Image
									loading="lazy"
									fill
									className={classes["orders-preview__image"]}
									src="https:placehold.co/400"
									alt={product?.title ?? "#"}
								/>
							</div>
							<div
								className={
									classes["orders-preview__product-title"]
								}
							>
								{product?.title}
							</div>
							<div>Amount {order.amount}</div>
							<div>${product?.discountPrice}</div>
						</LinkCustom>
					</div>

					<div className={classes["orders-preview__address"]}>
						<span>City</span>
						<span>{address?.city}</span>
						<span>Street</span>
						<span>{address?.street}</span>
						<span>Postal Code</span>
						<span>{address?.postalCode}</span>
					</div>

					<div className={classes["orders-preview__customer"]}>
						<span>User name</span>
						<div
							className={classes["orders-preview__customer-name"]}
						>
							<span>{customerState?.firstName}</span>
							<span>{customerState?.lastName}</span>
						</div>
						<span>Phone</span>
						<span>{customerState?.phone}</span>
					</div>
				</div>
			</Accordion.Body> */}
		</Accordion>
	);
};
