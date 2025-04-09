"use server";

import dynamic from "next/dynamic";
import classes from "./Cart.module.scss";
import CartBody from "./CartBody";

const CartBodyDynamic = dynamic(() => import("./CartBody"), {
    loading: () => (
        <div className={classes["loading"]}>
            <div className={classes["loading__spinner"]}></div>
        </div>
    ),
});

export default async function Cart() {
    return (
        <div className={`${classes.container} ${classes.cart}`}>
            <h3 className={classes[`cart__title`]}>Cart</h3>
            <CartBodyDynamic />
        </div>
    );
}
