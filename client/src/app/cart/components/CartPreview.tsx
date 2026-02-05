"use client";

import { TextClassList } from "@/types/textClassList.enum";
import classes from "./CartPreview.module.scss";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { changeAmount, removeCart } from "@/redux/store/cart/action";
import Image from "next/image";
import Tooltip from "@/ui/tooltip/Tooltip";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { ProductsById } from "@/hooks/useFetchProductByID";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";

export type CartItemProps = {
	className: string;
	product: ProductsById;
};

export default function CartPreview({ className, product }: CartItemProps) {
	const responsive = useAppSelector((state) => state.responsive);
	const dispatch = useAppDispatch();
	const [quantity, setQuantity] = useState(product.amount ?? 1);
	const [cart, setCart] = useState<{
		productId: number;
		amount: number;
		description: string;
		title: string;
		price: number;
		subtotalPrice: number;
		Media: {
			alt: string;
			blurSrc: string;
			src: string;
		};
	}>();
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
	const btnRemoveProductCart = useCallback(() => {
		if (!cart) return;
		dispatch(removeCart(cart.productId));
	}, [cart, dispatch]);

	useEffect(() => {
		(async () => {
			const media = product.Media[0];
			const placeholder = await getPlaceholderImage(media.src);
			const price = Math.round(
				product.price - product.price * (product.discount / 100),
			);
			setCart({
				productId: product.id,
				amount: product.amount as number,
				description: product.description,
				title: product.title,
				price,
				subtotalPrice: Math.round(price * (product.amount as number)),
				Media: {
					alt: media.name,
					blurSrc: placeholder.placeholder,
					src: media.src,
				},
			});
			return {};
		})();
	}, [product]);

	useEffect(() => {
		dispatch(
			changeAmount({ id: NaN, amount: quantity, productsId: product.id }),
		);
	}, [dispatch, quantity, product.id]);

	if (!cart) return;

	return (
		<div className={`${classes["cart-preview"]} ${className}`}>
			{/* <div className={classes["cart-preview__product"]}> */}
			<div className={classes["cart-preview__img"]}>
				<Image
					loading="eager"
					fill
					placeholder="blur"
					blurDataURL={cart.Media.blurSrc}
					src={cart.Media.src}
					alt={cart.Media.alt}
				/>
			</div>
			<div className={classes["cart-preview__content"]}>
				{/* <div className={classes["cart-preview__info"]}> */}
				<LinkCustom
					className={classes["cart-preview__title"]}
					href={{
						endpoint: `product/${cart.title.toLowerCase()}-p${cart.productId}`,
					}}
					styleSettings={{
						color: "DARK",
						type: "TEXT",
						size: "SMALL",
					}}
				>
					{cart.title}
				</LinkCustom>

				<Tooltip className={classes["cart-preview__description"]}>
					{cart.description}
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
						${cart.price}
					</span>
				)}
				<span className={`${classes["cart-preview__subtotal-price"]}`}>
					${cart.subtotalPrice}
				</span>
			</div>
		</div>
	);
}
