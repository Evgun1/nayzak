import { ButtonClassList } from "@/types/buttonClassList.enum";
import classes from "./CartHeader.module.scss";
import { FunctionComponent } from "react";
import { useAppSelector } from "@/redux/redux";

interface CartHeaderProps {}

const CartHeader: FunctionComponent<CartHeaderProps> = () => {
	const responsive = useAppSelector((state) => state.responsive);
	return (
		<div className={`${classes["cart-header"]}`}>
			<div className={ButtonClassList.BUTTON_SMALL}>Product</div>

			{responsive.isMobile ? (
				<></>
			) : (
				<>
					<div className={ButtonClassList.BUTTON_SMALL}>Quantity</div>
					<div className={ButtonClassList.BUTTON_SMALL}>Price</div>
					<div className={ButtonClassList.BUTTON_SMALL}>Subtotal</div>
				</>
			)}
		</div>
	);
};

export default CartHeader;
