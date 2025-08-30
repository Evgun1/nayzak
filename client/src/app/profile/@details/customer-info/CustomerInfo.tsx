"use client";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import classes from "./CustomerInfo.module.scss";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import Form from "@/ui/form/Form";
import { useEffect, useState } from "react";
import { writeCustomerAction } from "@/redux/store/customer/action";
import z, { ZodObject } from "zod";
import { validation } from "@/lib/validator/validator";

interface InputStateItem {
	name: string;
	placeholder: string;
	defaultValue: string;
}
type InputStateArray = Array<InputStateItem>;

const schemaDetailInformation: Array<ZodObject<any>> = [];

schemaDetailInformation.push(
	z.object({ ...validation.customer, email: validation.auth.register.email }),
);

const CustomerInfo = () => {
	const dispatch = useAppDispatch();

	const customerSelector = useAppSelector(
		(state) => state.customer.customerData,
	);
	const authSelector = useAppSelector((state) => state.auth.credentials);

	const onSubmitHandler = (event: {
		data: {
			firstName: string;
			lastName: string;
			email: string;
			phone: string;
		};
	}) => {
		const { email, firstName, lastName, phone } = event.data;
		dispatch(
			writeCustomerAction({
				firstName,
				lastName,
				phone: parseInt(phone),
			}),
		);
	};
	return (
		<div className={classes["customer-info"]}>
			<Form
				schema={schemaDetailInformation}
				onSubmit={onSubmitHandler}
				className={classes["customer-info__form"]}
			>
				<Form.InputDefault
					className={classes["customer-info__input"]}
					label="First name *"
					inputSettings={{
						placeholder: "First name",
						id: "firstName",
						name: "firstName",
						type: "text",
						defaultValue: customerSelector?.firstName,
					}}
					style="contained"
				/>
				<Form.InputDefault
					className={classes["customer-info__input"]}
					label="Last name *"
					inputSettings={{
						placeholder: "Last name",
						id: "lastName",
						name: "lastName",
						type: "text",
						defaultValue: customerSelector?.lastName,
					}}
					style="contained"
				/>
				<Form.InputDefault
					className={classes["customer-info__input"]}
					label="Phone *"
					inputSettings={{
						placeholder: "Phone",
						id: "phone",
						name: "phone",
						type: "number",
						maxLength: 20,
						defaultValue:
							customerSelector?.phone !== 0
								? customerSelector?.phone
								: "",
					}}
					style="contained"
				/>
				<Form.InputDefault
					className={classes["customer-info__input"]}
					label="Email address *"
					inputSettings={{
						placeholder: "Email address",
						id: "emailAddress",
						name: "emailAddress",
						type: "text",
						defaultValue: authSelector?.email,
					}}
					style="contained"
				/>
				<ButtonCustom
					className={classes["customer-info__button"]}
					typeProperty="submit"
					styleSettings={{
						fill: "SOLID",
						color: "DARK",
						roundness: "ROUNDED",
						type: "DEFAULT",
						size: "SMALL",
					}}
				>
					Send
				</ButtonCustom>
			</Form>
		</div>
	);
};
export default CustomerInfo;
