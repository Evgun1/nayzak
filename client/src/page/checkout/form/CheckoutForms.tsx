import { validation } from "@/lib/validator/validator";
import Form from "@/ui/form/Form";
import { FC, ReactNode } from "react";
import { z, ZodObject } from "zod";

type CheckoutFormProps = {
	children: ReactNode;
};

const schemaCustomersArr: Array<ZodObject<any>> = [];

const CheckoutForm: FC<CheckoutFormProps> = (props) => {
	schemaCustomersArr.push(z.object({ ...validation.customer }));
	const submitHandler = (value: {
		data: {
			addressesId: number;
			cartId: number[] | number;
			credentialsId: number;
			customersId: number;
			firstName: string;
			lastName: string;
			phone: string;
		};
	}) => {
		// const data = value.data;
		// try {
		// 	dispatch(
		// 		uploadOrders({
		// 			addressesId: data.addressesId,
		// 			cartId: data.cartId,
		// 			credentialsId: data.credentialsId,
		// 			customersId: data.credentialsId,
		// 		}),
		// 	);
		// 	dispatch(
		// 		writeCustomerAction({
		// 			firstName: data.firstName,
		// 			lastName: data.lastName,
		// 			phone: +data.phone,
		// 		}),
		// 	);
		// 	route.push("/");
		// } catch (error) {}
	};

	return (
		<Form
			schema={schemaCustomersArr}
			onSubmit={submitHandler}
			// className={classes["checkout__form"]}
		>
			{props.children}
		</Form>
	);
};

export default CheckoutForm;
