"use client";

import useFetchProductsById from "@/hooks/useFetchProductByID";
import { useAppSelector } from "@/redux/redux";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import { FC, useEffect, useMemo, useState } from "react";

import classes from "./Cart.module.scss";
import CartPreview, { CartItemProps } from "./CartPreview";
import { TextClassList } from "@/types/textClassList.enum";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import { log } from "console";

const CartBody: FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [cart, setCart] = useState<CartItemProps[]>([]);
	const cartSelect = useAppSelector((select) => select.cart.productsArray);
	const products = useFetchProductsById(cartSelect, true);

	useEffect(() => {
		(async () => {
			try {
				const cart: CartItemProps[] = await Promise.all(
					products.map(async (product) => {
						const media = product.Media[0];

						const placeholder = await getPlaceholderImage(
							media.src,
						);

						return {
							amount: product.amount,
							description: product.description,
							productID: product.id,
							title: product.title,
							mainPrice: Math.round(
								product.price -
									product.price * (product.discount / 100),
							),
							Media: {
								alt: media.name,
								blurSrc: placeholder.placeholder,
								src: media.src,
							},
						} as CartItemProps;
					}),
				);
				setCart(cart);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [products]);

	const totalPrice = useMemo(() => {
		const cartAllPrice = cart.map((cart) => cart.amount * cart.mainPrice);
		if (cartAllPrice.length <= 0) return 0;
		return cartAllPrice.reduce((accumulator, currentValue) => {
			return accumulator + currentValue;
		});
	}, [cart]);

	return (
		<>
			{!cart || cart.length <= 0 ? (
				<div
					className={`${TextClassList.REGULAR_22} ${classes["cart__message"]}`}
				>
					The cart is empty
				</div>
			) : (
				<>
					<div className={classes["cart__wrapper"]}>
						<div className={`${classes["cart__table"]}`}>
							<div className={ButtonClassList.BUTTON_SMALL}>
								Product
							</div>
							<div className={ButtonClassList.BUTTON_SMALL}>
								Quantity
							</div>
							<div className={ButtonClassList.BUTTON_SMALL}>
								Price
							</div>
							<div className={ButtonClassList.BUTTON_SMALL}>
								Subtotal
							</div>
						</div>
						{cart.map((item, index) => (
							<CartPreview
								Media={item.Media}
								key={index}
								productID={item.productID}
								amount={item.amount || 0}
								description={
									item.description ? item.description : ""
								}
								mainPrice={item.mainPrice}
								title={item.title}
							/>
						))}
					</div>
					<div className={classes["cart__summary-wrapper"]}>
						<div className={classes["cart__summary"]}>
							<span className={ButtonClassList.BUTTON_LARGE}>
								Cart summary
							</span>
							<div className={classes["cart__summary-price"]}>
								<span className={TextClassList.SEMIBOLD_18}>
									Total
								</span>
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
				</>
			)}
		</>
	);
};

export default CartBody;
