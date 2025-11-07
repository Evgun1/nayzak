"use client";

import { z, ZodEffects, ZodObject } from "zod";
import classes from "./PopupAddress.module.scss";
import PopupPreview from "../../components/popup/PopupPreview";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { uploadAddress } from "@/redux/store/address/action";
import { FormEvent } from "react";
import { validation } from "@/lib/validator/validator";
import Form from "@/ui/form/Form";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { AddressType } from "@/app/profile/@addresses/page";

type SubmitHandlerProps = {
	city: string;
	street: string;
	postalCode: string;
};

export default function PopupAddress({ data }: { data?: AddressType }) {
	const dispatch = useAppDispatch();
	const customer = useAppSelector((state) => state.customer.customerData);

	const schemaAddAddress: Array<ZodObject<any> | ZodEffects<any>> = [
		z.object(validation.addresses),
	];

	if (!customer?.firstName && !customer?.lastName)
		schemaAddAddress.push(z.object(validation.customer));

	const submitHandler = (
		object: { data: SubmitHandlerProps },
		element: FormEvent<HTMLFormElement>,
	) => {
		const { street, postalCode, city } = object.data;

		dispatch(
			uploadAddress({ street, postalCode: parseInt(postalCode), city }),
		);
	};

	return (
		<PopupPreview title={!data ? "Add address" : "Edit address"}>
			<Form
				onSubmit={submitHandler}
				oneMessage
				className={classes["popup-address__form"]}
				schema={schemaAddAddress}
			>
				<input
					type="hidden"
					value={data?.id}
					name="id"
				/>

				<div className={classes["popup-address__input-wrap"]}>
					<Form.InputDefault
						style={"contained"}
						inputSettings={{
							id: "city",
							name: "city",
							type: "text",
							placeholder: "City",
							defaultValue: data?.city,
						}}
					/>
					<Form.InputDefault
						style={"contained"}
						inputSettings={{
							id: "street",
							name: "street",
							type: "text",
							placeholder: "Street",
							defaultValue: data?.street,
						}}
					/>
					<Form.InputDefault
						style={"contained"}
						inputSettings={{
							id: "postalCode",
							name: "postalCode",
							type: "number",
							placeholder: "Postal code",
							maxLength: 6,
							defaultValue: data?.postalCode,
						}}
					/>
				</div>
				<ButtonCustom
					styleSettings={{
						color: "DARK",
						fill: "SOLID",
						roundness: "ROUNDED",
						size: "MEDIUM",
						type: "DEFAULT",
					}}
					typeProperty="submit"
				>
					{!data ? "Add" : "Update"}
				</ButtonCustom>
			</Form>
		</PopupPreview>
	);
}
