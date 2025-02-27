"use server";
import Link from "next/link";
import Price from "../../price/Price";

import classes from "./ProductsPreviewDefault.module.scss";
import Rating from "../../rating/Rating";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import { TextClassList } from "@/types/textClassList.enum";
import { FC } from "react";
import { ProductPreviewTypes } from "../ProductPreview.types";

const ProductPreviewDefault: FC<ProductPreviewTypes> = async (props) => {
    const { rating, className, stylePrice, product, showIcon = false } = props;

    function hasMonthPassed(startDate: any) {
        const now = new Date();
        const oneMonthLater = new Date(startDate);
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1); // Добавляем 1 месяц

        return now >= oneMonthLater;
    }

    const date = hasMonthPassed(product.createdAt);
    return (
        <Link
            className={`${className ?? ""} ${classes["preview"]}`}
            href={`/product/${product.title.replaceAll(" ", "_")}`}
        >
            <div className={classes["preview__img-wrapper"]}>
                {showIcon && !date && (
                    <div className={classes["preview__img-icon"]}>
                        <span className={TextClassList.SEMIBOLD_14}>NEW</span>
                    </div>
                )}

                <img
                    className={classes["preview__img"]}
                    src={
                        product.img
                            ? product.img
                            : "https://placehold.co/652x889"
                    }
                    alt='product'
                />
            </div>
            <div className={classes["preview__info-wrapper"]}>
                {rating && (
                    <Rating
                        customClasses={classes["preview__info-item"]}
                        rating={product.rating ? +product.rating : 0}
                    />
                )}
                <div
                    className={`${ButtonClassList.BUTTON_SMALL} ${classes["preview__info-item"]}`}
                >
                    {product.title}
                </div>
                <Price
                    style={stylePrice}
                    price={product.price}
                    mainPrice={product.mainPrice}
                    classBasePrice={TextClassList.SEMIBOLD_14}
                    classOldPrice={TextClassList.REGULAR_14}
                />
            </div>
        </Link>
    );
};

export default ProductPreviewDefault;
