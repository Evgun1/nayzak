"use client";
import classes from "./Contact.module.scss";
import { useAppSelector } from "@/redux/redux";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import Form from "@/ui/form/Form";
import { FunctionComponent } from "react";

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
	const customerState = useAppSelector(
		(state) => state.customer.customerData,
	);
	const credentialState = useAppSelector((state) => state.auth.credentials);

	return (
		<div
			className={classes["contact"]}
			id="checkout-contact"
		>
			<input
				type="hidden"
				name="customersId"
				value={customerState?.id}
				id={customerState?.id?.toString()}
			/>
			<input
				type="hidden"
				name="credentialsId"
				value={credentialState?.id}
				id={credentialState?.id?.toString()}
			/>
			<div className={classes["contact__title"]}>Contact information</div>
			<div className={classes["contact__input-wrap"]}>
				<Form.InputDefault
					className={classes["contact__input"]}
					label="First name"
					style={"contained"}
					inputSettings={{
						name: "firstName",
						id: "firstName",
						type: "text",
						placeholder: "First name",
						defaultValue: customerState?.firstName,
					}}
				/>
				<Form.InputDefault
					className={classes["contact__input"]}
					label="Last name"
					style={"contained"}
					inputSettings={{
						name: "lastName",
						id: "lastName",
						type: "text",
						placeholder: "Last name",
						defaultValue: customerState?.lastName,
					}}
				/>

				<Form.InputDefault
					className={`${classes["contact__input"]} ${classes["contact__input-phone"]}`}
					label="Phone"
					style={"contained"}
					inputSettings={{
						name: "phone",
						id: "phone",
						type: "text",
						placeholder: "Phone",
						defaultValue: customerState?.phone,
					}}
				/>
			</div>
		</div>
	);
};

export default Page;
