"use client";
import Link from "next/link";
import classes from "./ProductPreviewList.module.scss";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import { updateCart } from "@/redux/store/cart/action";
import { popupActions } from "@/redux/store/popup/popup";
import PopupError from "@/popups/popup-error/PopupError";
import { TextClassList } from "@/types/textClassList.enum";
import { ProductPreviewProps } from "../ProductPreview.types";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import Price from "../../price/Price";
import Rating from "../../rating/Rating";
import Image from "next/image";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";

const ProductPreviewList = (props: ProductPreviewProps) => {
	const { showRating: rating, stylePrice, product } = props;

	const user = useAppSelector((state) => state.auth.credentials);
	const dispatch = useAppDispatch();

	const btnClickAddToCart = () => {
		dispatch(updateCart({ productsId: product.id, amount: 1 }));
	};

	const btnClickErrorHandler = () => {
		dispatch(
			popupActions.toggle(
				<PopupError title="You need to log in to the site" />,
			),
		);
	};

	return (
		<div className={classes["preview"]}>
			<Link href={`product/${product.title}`}>
				<div className={classes["preview__img-wrapper"]}>
					<Image
						loading="lazy"
						sizes=""
						fill
						className={classes["preview__img"]}
						src={
							product.Media.src
								? product.Media.src
								: "https://placehold.co/652x889"
						}
						alt={product.Media.name}
					/>
				</div>
			</Link>
			<div className={classes["preview__info-wrapper"]}>
				<div
					className={`${ButtonClassList.BUTTON_SMALL} ${classes["preview__title"]}`}
				>
					{product.title}
				</div>
				<Price
					style={`${classes["preview__price"]} ${stylePrice}`}
					price={product.price}
					discount={product.discount}
					classBasePrice={TextClassList.SEMIBOLD_14}
					classOldPrice={TextClassList.REGULAR_14}
				/>
				{rating && (
					<Rating
						rating={product.rating.avg ? +product.rating.avg : 0}
						customClasses={classes["preview__rating"]}
					/>
				)}
				<div
					className={`${TextClassList.REGULAR_16} ${classes["preview__description"]}`}
				>
					{product.description}
				</div>
				<div className={classes["preview__btn-wrapper"]}>
					<ButtonCustom
						onClick={
							user ? btnClickAddToCart : btnClickErrorHandler
						}
						styleSettings={{
							color: "DARK",
							roundness: "ROUNDED",
							fill: "SOLID",
							size: "X_SMALL",
							type: "DEFAULT",
						}}
					>
						Add to Cart
					</ButtonCustom>
				</div>
			</div>
		</div>
	);
};

export default ProductPreviewList;
