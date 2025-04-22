"use server";

import classes from "./Checkout.module.scss";
import dynamic from "next/dynamic";

const CheckoutFormDynamic = dynamic(
    () => import("./checkout-forms/CheckoutForm"),
    {
        ssr: false,
    }
);
const Checkout = async () => {
    return (
        <div className={`container ${classes.checkout}`}>
            <h3 className={classes["checkout__header"]}>Checkout</h3>
            <CheckoutFormDynamic />
        </div>
    );
};

export default Checkout;
