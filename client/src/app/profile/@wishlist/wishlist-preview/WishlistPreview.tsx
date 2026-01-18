"use client";
import { TextClassList } from "@/types/textClassList.enum";

import classes from "./WishlistPreview.module.scss";
import { useAppDispatch } from "@/redux/redux";
import { removeWishlist } from "@/redux/store/wishlist/action";
import Image from "next/image";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { FC, useEffect, useMemo, useState } from "react";
import { ProductBase } from "@/types/product/productBase";
import { ProductPreviewItem } from "@/components/product-preview/ProductPreview.types";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import Link from "next/link";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { ProductsById } from "@/hooks/useFetchProductByID";

type WishlistItemProps = {
	product: ProductsById;
	// product: ProductPreviewItem;
};

const WishlistPreview: FC<WishlistItemProps> = ({ product }) => {
	const [productState, setProductState] = useState<ProductPreviewItem>();

	const dispatch = useAppDispatch();

	const btnClickRemove = () => {
		dispatch(removeWishlist(product.id));
	};

	const discountPrice = useMemo(() => {
		return Math.round(
			product.price - (product.price * product.discount) / 100,
		);
	}, [product.price, product.description]);

	useEffect(() => {
		(async () => {
			const blur = await getPlaceholderImage(product.Media[0].src);

			console.log(blur);

			setProductState({
				...product,
				Media: {
					...product.Media[0],
					blurImage: blur.placeholder,
				},
			});
		})();
	}, [product]);

	if (!productState) return;
	return (
		<div className={classes["wishlist-preview"]}>
			<div className={classes["wishlist-preview__info-wrap"]}>
				<Link
					href={`/product/${productState.title}-p${productState.id}`}
					className={classes["wishlist-preview__image-wrap"]}
				>
					<Image
						placeholder="blur"
						blurDataURL={productState.Media.blurImage}
						loading="lazy"
						fill
						className={classes["wishlist-preview__image"]}
						src={productState.Media.src ?? ""}
						alt={productState.Media.name ?? ""}
					/>
				</Link>
				<div className={classes["wishlist-preview__info"]}>
					<LinkCustom
						href={{
							endpoint: `/product/${productState.title}-p${productState.id}`,
						}}
						styleSettings={{
							color: "DARK",
							type: "TEXT",
							size: "LARGE",
							state: ["HOVER"],
						}}
						className={`${classes["wishlist-preview__info-item"]}`}
					>
						{productState.title}
					</LinkCustom>
					<div
						className={`${classes["wishlist-preview__info-item"]}`}
					>
						{productState.description}
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
					<span className={`${classes["wishlist-preview__price"]}`}>
						${discountPrice}
					</span>
				</div>
			</div>
		</div>
	);
};

export default WishlistPreview;
