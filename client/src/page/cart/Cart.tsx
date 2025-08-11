"use server";

import dynamic from "next/dynamic";
import classes from "./Cart.module.scss";
import CartBody from "./CartBody";
import { FC } from "react";

const CartBodyDynamic = dynamic(() => import("./CartBody"), {

});

const Cart: FC = async () => {
	return (
		<div className={`${classes.container} ${classes.cart}`}>
			<h3 className={classes[`cart__title`]}>Cart</h3>
			<CartBodyDynamic />
		</div>
	);
};

export default Cart;
