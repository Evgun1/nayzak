"use client";

import useFetchProductsById from "@/hooks/useFetchProductByID";
import { useAppSelector } from "@/redux/redux";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import { useEffect, useMemo, useState } from "react";

import classes from "./Cart.module.scss";
import { TextClassList } from "@/types/textClassList.enum";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import CartPreview, { CartItemProps } from "./components/CartPreview";
import CartHeader from "./components/CartHeader";
import CartSummary from "./components/CartSummary";

export default function Page() {
	const cartSelect = useAppSelector((select) => select.cart.productsArray);
	const products = useFetchProductsById(cartSelect, true);

	console.log(cartSelect);

	const t = useMemo(() => {
		if (cartSelect.length <= 0) {
			return (
				<div
					className={`${TextClassList.REGULAR_22} ${classes["cart__message"]}`}
				>
					The cart is empty
				</div>
			);
		}
		return false;
	}, [cartSelect]);

	if (t) {
		return t;
	}
	return (
		<>
			<div className={classes["cart__wrapper"]}>
				<CartHeader />
				{products.map((item, index) => (
					<CartPreview
						key={index}
						className={classes["cart__preview"]}
						product={item}
					/>
				))}
				<CartSummary products={products} />
			</div>
		</>
	);
}
