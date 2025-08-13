"use client";

import { TextClassList } from "@/types/textClassList.enum";
import classes from "./CartPreview.module.scss";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/redux";
import { changeAmount, removeCart } from "@/redux/store/cart/action";
import Image from "next/image";
import Tooltip from "@/ui/tooltip/Tooltip";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";

export type CartItemProps = {
	title: string;
	description: string;
	amount: number;
	mainPrice: number;
	productID: number;
	Media: { src: string; alt: string; blurSrc: string };
};

export default function CartPreview({
	title,
	description,
	amount,
	mainPrice,
	productID,
	Media,
}: CartItemProps) {
	const dispatch = useAppDispatch();
	const [quantity, setQuantity] = useState(amount ?? 1);

	const buttonChangeQuantity = useCallback(
		(event: MouseEvent) => {
			const currentTarget = event.currentTarget;
			if (currentTarget.id === "plus-quantity") {
				setQuantity(quantity + 1);
			}
			if (currentTarget.id === "minus-quantity") {
				if (quantity !== 1) {
					setQuantity(quantity - 1);
				}
			}
		},
		[quantity],
	);

	const btnRemoveProductCart = () => {
		dispatch(removeCart(productID));
	};

	useEffect(() => {
		dispatch(
			changeAmount({ id: NaN, amount: quantity, productsId: productID }),
		);
	}, [dispatch, quantity, productID]);

	const price = Math.round(mainPrice);
	const subtotalPrice = Math.round(mainPrice * (amount as number));

	return (
		<div className={`${classes["cart-preview"]}`}>
			<div className={classes["cart-preview__product"]}>
				<div className={classes["cart-preview__img-wrapper"]}>
					<Image
						loading="eager"
						fill
						className={classes["cart-preview__img"]}
						placeholder="blur"
						blurDataURL={Media.blurSrc}
						src={Media.src}
						alt={Media.alt}
					/>
				</div>
				<div className={classes["cart-preview__info"]}>
					<LinkCustom
						href={{
							endpoint: `product/${title.toLowerCase()}-p${productID}`,
						}}
						styleSettings={{
							color: "DARK",
							type: "TEXT",
							size: "SMALL",
						}}
					>
						{title}
					</LinkCustom>
					<Tooltip value={description} />
					<ButtonCustom
						styleSettings={{
							color: "DARK",
							roundness: "SHARP",
							type: "TEXT",
							size: "X_SMALL",
							icon: { left: "TRASH" },
						}}
						onClick={btnRemoveProductCart}
					>
						Remove
					</ButtonCustom>
				</div>
			</div>
			<div className={classes["cart-preview__amount"]}>
				<ButtonCustom
					id="minus-quantity"
					styleSettings={{
						color: "DARK",
						roundness: "SHARP",
						size: "X_SMALL",
						type: "TEXT",
						icon: { left: "MINUS" },
					}}
					onClick={buttonChangeQuantity}
					className={classes["cart-preview__amount-btn"]}
				/>
				<div className={TextClassList.SEMIBOLD_12}>{quantity}</div>
				<ButtonCustom
					id="plus-quantity"
					styleSettings={{
						color: "DARK",
						roundness: "SHARP",
						size: "X_SMALL",
						type: "TEXT",
						icon: { left: "ADD" },
					}}
					onClick={buttonChangeQuantity}
					className={classes["cart-preview__amount-btn"]}
				/>
			</div>
			<span className={TextClassList.REGULAR_18}>${price}</span>
			<span className={TextClassList.SEMIBOLD_18}>${subtotalPrice}</span>
		</div>
	);
}
