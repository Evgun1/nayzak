"use client";
import { IProduct } from "@/types/product/product.interface";
import classes from "./ProductDescription.module.scss";
import { TextClassList } from "@/types/textClassList.enum";

type ProductDescriptionProps = {
	productData: Pick<IProduct, "description">;
};

const ProductDescription = (props: ProductDescriptionProps) => {
	const { productData } = props;

	return (
		<div className={classes.description}>
			<p className={TextClassList.REGULAR_18}>
				{productData.description}
			</p>
			<div className={classes["description__info"]}>
				<div className={`h7 ${classes["description__info-header"]}`}>
					Information
				</div>
				<ul className={classes["description__list"]}>
					<li
						className={`${TextClassList.REGULAR_18} ${classes["description__list-item"]}`}
					>
						value
					</li>
					<li
						className={`${TextClassList.REGULAR_18} ${classes["description__list-item"]}`}
					>
						value
					</li>
					<li
						className={`${TextClassList.REGULAR_18} ${classes["description__list-item"]}`}
					>
						value
					</li>
					<li
						className={`${TextClassList.REGULAR_18} ${classes["description__list-item"]}`}
					>
						value
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ProductDescription;
