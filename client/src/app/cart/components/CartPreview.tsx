"use client";

import { TextClassList } from "@/types/textClassList.enum";
import classes from "./CartPreview.module.scss";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { changeAmount, removeCart } from "@/redux/store/cart/action";
import Image from "next/image";
import Tooltip from "@/ui/tooltip/Tooltip";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";

export type CartItemProps = {
	className: string;
	title: string;
	description: string;
	amount: number;
	mainPrice: number;
	productID: number;
	Media: { src: string; alt: string; blurSrc: string };
};

export default function CartPreview({
	className,
	title,
	description,
	amount,
	mainPrice,
	productID,
	Media,
}: CartItemProps) {
	const responsive = useAppSelector((state) => state.responsive);
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
		<div className={`${classes["cart-preview"]} ${className}`}>
			{/* <div className={classes["cart-preview__product"]}> */}
			<div className={classes["cart-preview__img"]}>
				<Image
					loading="eager"
					fill
					placeholder="blur"
					blurDataURL={Media.blurSrc}
					src={Media.src}
					alt={Media.alt}
				/>
			</div>
			<div className={classes["cart-preview__content"]}>
				{/* <div className={classes["cart-preview__info"]}> */}
				<LinkCustom
					className={classes["cart-preview__title"]}
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

				<Tooltip className={classes["cart-preview__description"]}>
					{description}
				</Tooltip>
				{/* </div> */}
				<ButtonCustom
					className={classes["cart-preview__btn"]}
					styleSettings={{
						color: "DARK",
						roundness: "SHARP",
						type: "TEXT",
						size: !responsive.isMobile ? "X_SMALL" : "SMALL",
						icon: { left: "TRASH" },
					}}
					onClick={btnRemoveProductCart}
				>
					{!responsive.isMobile && <>Remove</>}
				</ButtonCustom>
				{/* </div> */}
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
					<div
						className={`${TextClassList.SEMIBOLD_12} ${classes["cart-preview__amount-quantity"]}`}
					>
						{quantity}
					</div>
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
				{!responsive.isMobile && (
					<span
						className={`${TextClassList.REGULAR_18} ${classes["cart-preview__price"]}`}
					>
						${price}
					</span>
				)}
				<span className={`${classes["cart-preview__subtotal-price"]}`}>
					${subtotalPrice}
				</span>
			</div>
		</div>
	);
}
