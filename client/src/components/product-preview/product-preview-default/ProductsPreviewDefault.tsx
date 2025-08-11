import Link from "next/link";
import Price from "../../price/Price";

import classes from "./ProductsPreviewDefault.module.scss";
import Rating from "../../rating/Rating";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import { TextClassList } from "@/types/textClassList.enum";
import { FC, useMemo } from "react";
import { ProductPreviewProps } from "../ProductPreview.types";
import Image from "next/image";

const ProductPreviewDefault: FC<ProductPreviewProps> = (props) => {
	function hasMonthPassed(startDate: Date) {
		const now = new Date();
		const oneMonthLater = new Date(startDate);
		oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

		return now >= oneMonthLater ? true : false;
	}

	const date = hasMonthPassed(props.product.createdAt);

	const as = `/product/${props.product.title
		.replaceAll(" ", "-")
		.toLowerCase()}-p${props.product.id}`;

	const href = `/product/${props.product.id}`;

	return (
		<Link
			className={`${props.className ?? ""} ${classes["preview"]}`}
			href={{ href }}
			as={as}
		>
			<div className={classes["preview__img-wrapper"]}>
				{props.showIcon && !date ? (
					<div className={classes["preview__img-icon"]}>
						<span className={TextClassList.SEMIBOLD_14}>NEW</span>
					</div>
				) : (
					<></>
				)}

				<Image
					loading="lazy"
					placeholder={
						props.product.Media.blurImage ? "blur" : "empty"
					}
					blurDataURL={props.product.Media.blurImage}
					fill
					sizes="width:100%; height:100%"
					className={classes["preview__img"]}
					src={props.product.Media?.src}
					alt={props.product.Media?.name}
				/>
			</div>
			<div className={classes["preview__info-wrapper"]}>
				{props.showRating === true ? (
					<Rating
						customClasses={classes["preview__info-item"]}
						rating={
							props.product.rating ? +props.product.rating : 0
						}
					/>
				) : (
					<></>
				)}
				<div
					className={`${ButtonClassList.BUTTON_SMALL} ${classes["preview__info-item"]}`}
				>
					{props.product.title}
				</div>
				<Price
					style={props.stylePrice}
					price={props.product.price}
					discount={props.product.discount}
					classBasePrice={TextClassList.SEMIBOLD_14}
					classOldPrice={TextClassList.REGULAR_14}
				/>
			</div>
		</Link>
	);
};

export default ProductPreviewDefault;
