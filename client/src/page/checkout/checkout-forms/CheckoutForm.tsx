"use client";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { useEffect } from "react";
import { uploadOrders } from "@/redux/store/orders/action";
import { useRouter, redirect } from "next/navigation";
import { writeCustomerAction } from "@/redux/store/customer/action";
import { z, ZodObject } from "zod";
import {
	CheckoutFormAddress,
	CheckoutFormContactInformation,
} from "./CheckoutInputs";
import CheckoutOrder from "../checkout-order/CheckoutOrder";

import classes from "./CheckoutForm.module.scss";
import { validation } from "@/lib/validator/validator";
import Form from "@/ui/form/Form";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import dynamic from "next/dynamic";
import Spinner from "@/components/loading/Spinner";

const schemaCustomersArr: Array<ZodObject<any>> = [];

const CheckoutForm = () => {
	schemaCustomersArr.push(z.object({ ...validation.customer }));
	const route = useRouter();
	const cart = useAppSelector((state) => state.cart.productsArray);
	const dispatch = useAppDispatch();

	const submitHandler = (value: {
		data: {
			addressesId: number;
			credentialsId: number;
			customersId: number;
			firstName: string;
			lastName: string;
			phone: string;
		};
	}) => {
		const data = value.data;
		try {
			dispatch(
				uploadOrders({
					addressesId: data.addressesId,
					cartId: cart.map((cart) => cart.id),
				}),
			);
			dispatch(
				writeCustomerAction({
					firstName: data.firstName,
					lastName: data.lastName,
					phone: +data.phone,
				}),
			);

			route.push("/");
		} catch (error) {}
	};

	useEffect(() => {
		if (cart.length === 0) redirect("/");
	}, [cart]);

	return (
		<Form
			schema={schemaCustomersArr}
			onSubmit={submitHandler}
			className={classes["checkout__form"]}
		>
			<div className={classes["checkout__input"]}>
				<CheckoutFormContactInformation />
				<CheckoutFormAddress />
			</div>
			<ButtonCustom
				typeProperty="submit"
				styleSettings={{
					fill: "SOLID",
					type: "DEFAULT",
					color: "DARK",
					size: "MEDIUM",
					roundness: "ROUNDED",
				}}
			>
				Place order
			</ButtonCustom>
		</Form>
	);
};

export default CheckoutForm;
