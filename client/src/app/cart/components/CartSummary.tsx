"use client";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import classes from "./CartSummary.module.scss";
import { FunctionComponent, useMemo } from "react";
import { TextClassList } from "@/types/textClassList.enum";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { ProductsById } from "@/hooks/useFetchProductByID";

interface CartSummaryProps {
	products: ProductsById[];
}

const CartSummary: FunctionComponent<CartSummaryProps> = (props) => {
	const { products } = props;

	const totalPrice = useMemo(() => {
		const discountPrice = products.map((product) => {
			const allPrice = Math.round(
				product.price * (product.discount / 100),
			);
			return { price: allPrice, amount: product.amount };
		});

		const cartAllPrice: number[] = [];
		for (const product of discountPrice) {
			if (!product.amount) continue;
			cartAllPrice.push(product.amount * product.price);
		}
		if (cartAllPrice.length <= 0) return 0;
		return cartAllPrice.reduce((accumulator, currentValue) => {
			return accumulator + currentValue;
		});
	}, [products]);

	return (
		<div className={classes["cart-summary"]}>
			<div className={classes["cart-summary__content"]}>
				<span className={ButtonClassList.BUTTON_LARGE}>
					Cart summary
				</span>
				<div className={classes["cart-summary__price"]}>
					<span className={TextClassList.SEMIBOLD_18}>Total</span>
					<span className={TextClassList.SEMIBOLD_18}>
						${totalPrice}
					</span>
				</div>
				<LinkCustom
					href={{ endpoint: "/checkout" }}
					styleSettings={{
						type: "DEFAULT",
						size: "MEDIUM",
						fill: "SOLID",
						color: "DARK",
						roundness: "ROUNDED",
					}}
				>
					Checkout
				</LinkCustom>
			</div>
		</div>
	);
};

export default CartSummary;
