"use client";
import { TextClassList } from "@/types/textClassList.enum";
import classes from "./CheckoutOrderProduct.module.scss";
import Image from "next/image";
import { ProductsById } from "@/hooks/useFetchProductByID";

const CheckoutOrderProduct = ({ product }: { product: ProductsById }) => {
	const price = Math.round(
		product.price - (product.price * product.discount) / 100,
	);

	return (
		<div className={classes["product"]}>
			<div className={classes["product__img-wrap"]}>
				<Image
					loading="lazy"
					fill
					sizes="width: 100%;"
					className={classes["product__img"]}
					src={product.Media[0].src}
					alt={product.Media[0].name}
				/>
			</div>
			<div className={classes["product__info"]}>
				<div className={classes["product__content"]}>
					<div className={TextClassList.SEMIBOLD_14}>
						{product.title}
					</div>

					{/* <Tooltip value={product.description} /> */}

					<div
						className={`${TextClassList.REGULAR_12} ${classes["product__content-desc"]}`}
					>
						{product.description}
					</div>

					<div className={classes["product__amount"]}>
						<span className={TextClassList.SEMIBOLD_12}>
							Amount:
						</span>
						<span className={TextClassList.SEMIBOLD_12}>
							{product.amount}
						</span>
					</div>
				</div>
				<div className={classes["product__"]}>
					<div className={TextClassList.SEMIBOLD_14}>${price}</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutOrderProduct;
