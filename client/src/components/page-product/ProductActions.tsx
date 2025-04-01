"use client";

import { FC, useEffect, useState } from "react";
import classes from "./ProductActions.module.scss";
import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";
import { updateCart } from "@/lib/redux/store/cart/action";
import { saveWishlist } from "@/lib/redux/store/wishlist/action";
import { TextClassList } from "@/types/textClassList.enum";
import { popupActions } from "@/lib/redux/store/popup/popup";
import PopupError from "@/components/popup-error/PopupError";
import { ButtonCustom } from "@/lib/ui/custom-elements/button-custom/ButtonCustom";

type ProductActionsProps = {
    className?: string;
    productID: number;
};

const ProductActions: FC<ProductActionsProps> = ({ productID, className }) => {
    const user = useAppSelector((state) => state.auth.credentials);
    const wishlist = useAppSelector((state) => state.wishlist.productsArray);

    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);
    const [activeWishlist, setActiveWishlist] = useState<boolean>(false);

    const btnClickErrorHandler = () => {
        dispatch(
            popupActions.toggle(
                <PopupError title='You need to log in to the site' />
            )
        );
    };

    const wishlistProduct = wishlist.find(
        (value) => value.productID === productID
    );
    useEffect(() => {
        setActiveWishlist(wishlistProduct ? true : false);
    }, [wishlistProduct]);

    const btnClickAddToCart = () => {
        dispatch(updateCart({ productID, amount: quantity }));
    };

    const btnClickAddToWishlists = () => {
        dispatch(saveWishlist({ productID }));
    };

    const btnClickPlusQuantity = () => {
        setQuantity(quantity + 1);
    };
    const btnClickMinusQuantity = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div
            className={`${classes["product-actions"]} ${
                className ? className : ""
            }`}
        >
            <div className={classes["product-actions__quantity"]}>
                <ButtonCustom
                    styleSettings={{
                        color: "DARK",
                        type: "TEXT",
                        size: "SMALL",
                        icon: { left: "MINUS" },
                    }}
                    onClick={btnClickMinusQuantity}
                />
                <span className={TextClassList.SEMIBOLD_16}>{quantity}</span>
                <ButtonCustom
                    styleSettings={{
                        color: "DARK",
                        type: "TEXT",
                        size: "SMALL",
                        icon: { left: "ADD" },
                    }}
                    onClick={btnClickPlusQuantity}
                />
            </div>
            <ButtonCustom
                onClick={user ? btnClickAddToCart : btnClickErrorHandler}
                className={classes["product-actions__button-add"]}
                styleSettings={{
                    color: "DARK",
                    fill: "SOLID",
                    roundness: "SHARP",
                    size: "MEDIUM",
                    type: "DEFAULT",
                }}
            >
                Add to Cart
            </ButtonCustom>
            <div className={classes["product-actions__button-list"]}>
                <ButtonCustom
                    styleSettings={{
                        color: "DARK",
                        type: "TEXT",
                        size: "SMALL",
                        icon: { left: "HEART" },
                    }}
                    onClick={
                        user ? btnClickAddToWishlists : btnClickErrorHandler
                    }
                    className={activeWishlist ? classes["active"] : null}
                >
                    Wishlist
                </ButtonCustom>
            </div>
        </div>
    );
};

export default ProductActions;
