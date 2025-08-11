"use server";

import { FC } from "react";
import classes from "./Checkout.module.scss";
import dynamic from "next/dynamic";
import CheckoutForm from "./checkout-forms/CheckoutForm";
import Spinner from "@/components/loading/Spinner";
import CheckoutOrder from "./checkout-order/CheckoutOrder";

const CheckoutOrderDynamic = dynamic(
	() => import("./checkout-order/CheckoutOrder"),
	{
		ssr: false,
		loading: () => (
			<div className={classes["checkout-order-dynamic"]}>
				<Spinner
					className={classes["checkout-order-dynamic__spinner"]}
				/>
			</div>
		),
	},
);

const Checkout: FC = async () => {
	return (
		<div className={`container ${classes.checkout}`}>
			<h3 className={classes["checkout__header"]}>Checkout</h3>

			<div className={classes["checkout__main"]}>
				<CheckoutForm />
				<CheckoutOrder />
			</div>
		</div>
	);
};

export default Checkout;
