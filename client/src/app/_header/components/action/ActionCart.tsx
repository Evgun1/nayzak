import { useAppSelector } from "@/redux/redux";
import classes from "./ActionCart.module.scss";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { FunctionComponent, useEffect, useState } from "react";

interface ActionCartProps {}

const ActionCart: FunctionComponent<ActionCartProps> = () => {
	const userData = useAppSelector((selector) => selector.auth.credentials);
	const cartSelector = useAppSelector((selector) => selector.cart);
	const [cartAmount, setCartAmount] = useState(0);

	useEffect(() => {
		setCartAmount(cartSelector.totalAmount);
	}, [cartSelector]);
	return (
		<LinkCustom
			href={{ endpoint: !userData ? "#" : "/cart" }}
			styleSettings={{
				state: ["HOVER"],
				roundness: "ROUNDED",
				color: "DARK",
				icon: { left: "BAG" },
				type: "TEXT",
				size: "LARGE",
			}}
			className={`${classes["action-cart"]} ${
				cartAmount !== 0 ? classes["action-cart__amount-active"] : ""
			}`}
		>
			{cartAmount !== 0 && (
				<span className={classes["action-cart__amount"]}>
					{cartAmount}
				</span>
			)}
		</LinkCustom>
	);
};

export default ActionCart;
