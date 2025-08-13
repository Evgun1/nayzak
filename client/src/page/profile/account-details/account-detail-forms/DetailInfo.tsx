"use client";

import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { z, ZodObject } from "zod";

import classes from "./DetailInfo.module.scss";
import { writeCustomerAction } from "@/redux/store/customer/action";
import { validation } from "@/lib/validator/validator";
import Form from "@/ui/form/Form";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";

const schemaDetailInformation: Array<ZodObject<any>> = [];

schemaDetailInformation.push(
	z.object({ ...validation.customer, email: validation.auth.register.email }),
);

const DetailInfo = () => {
	const dispatch = useAppDispatch();
	const customerSelector = useAppSelector(
		(state) => state.customer.customerData,
	);

	const emailSelector = useAppSelector(
		(state) => state.auth.credentials?.email,
	);

	const dataInformationHandler = (event: {
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
		<Form
			schema={schemaDetailInformation}
			onSubmit={dataInformationHandler}
			className={classes["account-details-customer"]}
		>
			<div className={classes["account-details-customer__input-wrap"]}>
				<Form.InputDefault
					label="First name *"
					inputSettings={{
						placeholder: "Fist name",
						id: "firstName",
						name: "firstName",
						type: "text",
						defaultValue: customerSelector?.firstName,
					}}
					style="contained"
				/>
				<Form.InputDefault
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
					label="Email *"
					inputSettings={{
						placeholder: "Email",
						id: "email",
						name: "email",
						type: "email",
						autoComplete: "email",

						defaultValue: emailSelector,
					}}
					style="contained"
				/>
			</div>
			<ButtonCustom
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
	);
};

export default DetailInfo;
