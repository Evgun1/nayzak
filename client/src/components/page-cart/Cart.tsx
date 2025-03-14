"use server";

import classes from "./Cart.module.scss";
import dynamic from "next/dynamic";

const CartBodyDynamic = dynamic(() => import("./CartBody"), {
    ssr: false,
    loading: () => {
        return (
            <div className={classes["loading"]}>
                <div className={classes["loading__spinner"]}></div>
            </div>
        );
    },
});

export default async function Cart() {
    return (
        <div className={`${classes.container} ${classes.cart}`}>
            <h3 className={classes[`cart__title`]}>Cart</h3>

            <CartBodyDynamic />
        </div>
    );
}
