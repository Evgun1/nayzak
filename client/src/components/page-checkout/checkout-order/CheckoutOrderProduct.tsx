"use client";

import { ProductItem } from "@/types/product.types";
import { TextClassList } from "@/types/textClassList.enum";
import classes from "./CheckoutOrderProduct.module.scss";
import Tooltip from "@/lib/ui/tooltip/Tooltip";
import Image from "next/image";

const CheckoutOrderProduct = ({ product }: { product: ProductItem }) => {
    return (
        <div className={classes["product"]}>
            <div className={classes["product__img-wrap"]}>
                <Image
                    loading='lazy'
                    fill
                    sizes='width: 100%;'
                    className={classes["product__img"]}
                    src='https://placehold.co/652x889'
                    alt='product'
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
                    <div className={TextClassList.SEMIBOLD_14}>
                        ${product.mainPrice}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutOrderProduct;
