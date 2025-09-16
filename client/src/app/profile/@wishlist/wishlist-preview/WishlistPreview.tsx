"use client";
import { TextClassList } from "@/types/textClassList.enum";

import classes from "./WishlistPreview.module.scss";
import { useAppDispatch } from "@/redux/redux";
import { removeWishlist } from "@/redux/store/wishlist/action";
import Image from "next/image";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { FC, useEffect, useState } from "react";
import { ProductBase } from "@/types/product/productBase";
import { ProductPreviewItem } from "@/components/product-preview/ProductPreview.types";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";

type WishlistItemProps = {
	product: ProductPreviewItem;
};

const WishlistPreview: FC<WishlistItemProps> = ({ product }) => {
	const dispatch = useAppDispatch();

	const btnClickRemove = () => {
		dispatch(removeWishlist(product.id));
	};

	const discountPrice = Math.round(
		product.price - (product.price * product.discount) / 100,
	);

	return (
		<div className={classes["wishlist-preview"]}>
			<div className={classes["wishlist-preview__info-wrap"]}>
				<div className={classes["wishlist-preview__image-wrap"]}>
					<Image
						placeholder="blur"
						blurDataURL={product.Media.blurImage}
						loading="lazy"
						fill
						className={classes["wishlist-preview__image"]}
						src={product.Media.src}
						alt={product.Media.name}
					/>
				</div>
				<div className={classes["wishlist-preview__info"]}>
					<div
						className={`${TextClassList.SEMIBOLD_18} ${classes["wishlist-preview__info-item"]}`}
					>
						{product.title}
					</div>
					<div
						className={`${classes["wishlist-preview__info-item"]} ${TextClassList.REGULAR_14}`}
					>
						{product.description}
					</div>
					<ButtonCustom
						styleSettings={{
							color: "DARK",
							size: "X_SMALL",
							type: "TEXT",
							icon: { left: "TRASH" },
						}}
						className={classes["wishlist-preview__info-item"]}
						onClick={btnClickRemove}
					>
						Remove
					</ButtonCustom>
				</div>
			</div>
			<span
				className={`${TextClassList.REGULAR_18} ${classes["wishlist-preview__price"]}`}
			>
				${discountPrice}
			</span>
		</div>
	);
};

export default WishlistPreview;
