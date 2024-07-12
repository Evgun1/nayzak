import Link from "next/link";
import { ButtonClassList } from "../types/buttonClassList";
import { TextClassList } from "../types/textClassList";
import { ProductTypes } from "../types/products";
import { FC } from "react";

import classes from "./ProductPreview.module.scss";
import Price from "../price/Price";

type ProductPreviewProps = {
  product: ProductTypes;
};

const ProductPreview: FC<ProductPreviewProps> = ({ product }) => {
  const productTitle = product.title.replaceAll(" ", "_");

  return (
    <Link className={classes.card} href={`/product/${productTitle}`}>
      <img
        className={classes.card__img}
        src="https://placehold.co/400"
        alt=""
      />

      <div className={classes["card__content"]}>
        <div
          className={`${classes["card__content-title"]} ${ButtonClassList.BUTTON_SMALL}`}
        >
          {product.title}
        </div>
        <div className={classes["card__content-price"]}>
          <Price
            price={product.price}
            discountPercentage={product.discount}
            classBasePrice={TextClassList.SEMIBOLD_14}
            classOldPrice={TextClassList.REGULAR_14}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProductPreview;
