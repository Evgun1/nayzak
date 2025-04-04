"use client";

import { TextClassList } from "@/types/textClassList.enum";
import classes from "./CartPreview.module.scss";
import { ButtonCustom } from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/redux/redux";
import { changeAmount, removeCart } from "@/lib/redux/store/cart/action";
import Image from "next/image";
import Tooltip from "@/lib/ui/tooltip/Tooltip";

type CartItemProps = {
    title: string;
    description: string;
    amount?: number;
    mainPrice: number;
    productID: number;
};

export default function CartPreview({
    title,
    description,
    amount,
    mainPrice,
    productID,
}: CartItemProps) {
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(amount ?? 1);

    const buttonChangeQuantity = useCallback(
        (event: MouseEvent) => {
            const currentTarget = event.currentTarget;
            if (currentTarget.id === "plus-quantity") {
                setQuantity(quantity + 1);
            }
            if (currentTarget.id === "minus-quantity") {
                if (quantity !== 1) {
                    setQuantity(quantity - 1);
                }
            }
        },
        [quantity]
    );

    const btnRemoveProductCart = () => {
        dispatch(removeCart(productID));
    };

    useEffect(() => {
        dispatch(changeAmount({ amount: quantity, productID }));
    }, [dispatch, quantity, productID]);

    return (
        <div className={`${classes["cart-preview"]}`}>
            <div className={classes["cart-preview__product"]}>
                <div className={classes["cart-preview__img-wrapper"]}>
                    <Image
                        loading='eager'
                        fill
                        className={classes["cart-preview__img"]}
                        src='https://placehold.co/600'
                        alt='product'
                    />
                </div>
                <div className={classes["cart-preview__info"]}>
                    <span className={`${TextClassList.SEMIBOLD_14}`}>
                        {title}
                    </span>
                    <Tooltip value={description} />
                    {/* <span
                        className={`${TextClassList.REGULAR_12} ${classes["cart-preview__info-item"]}`}
                    >
                        {description}
                    </span> */}
                    <ButtonCustom
                        styleSettings={{
                            color: "DARK",
                            roundness: "SHARP",
                            type: "TEXT",
                            size: "X_SMALL",
                            icon: { left: "TRASH" },
                        }}
                        onClick={btnRemoveProductCart}
                    >
                        Remove
                    </ButtonCustom>
                </div>
            </div>
            <div className={classes["cart-preview__amount"]}>
                <ButtonCustom
                    id='minus-quantity'
                    styleSettings={{
                        color: "DARK",
                        roundness: "SHARP",
                        size: "X_SMALL",
                        type: "TEXT",
                        icon: { left: "MINUS" },
                    }}
                    onClick={buttonChangeQuantity}
                    className={classes["cart-preview__amount-btn"]}
                />
                <div className={TextClassList.SEMIBOLD_12}>{quantity}</div>
                <ButtonCustom
                    id='plus-quantity'
                    styleSettings={{
                        color: "DARK",
                        roundness: "SHARP",
                        size: "X_SMALL",
                        type: "TEXT",
                        icon: { left: "ADD" },
                    }}
                    onClick={buttonChangeQuantity}
                    className={classes["cart-preview__amount-btn"]}
                />
            </div>
            <span className={TextClassList.REGULAR_18}>${mainPrice}</span>
            <span className={TextClassList.SEMIBOLD_18}>
                ${mainPrice * (amount as number)}
            </span>
        </div>
    );
}
