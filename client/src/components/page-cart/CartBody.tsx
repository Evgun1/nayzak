"use client";

import useFetchProductsById from "@/hooks/useFetchProductByID";
import { useAppSelector } from "@/lib/redux/redux";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import { FC, useEffect, useLayoutEffect, useState } from "react";

import classes from "./Cart.module.scss";
import CartPreview from "./CartPreview";
import LinkCustom from "@/lib/ui/custom-elements/link-custom/LinkCustom";
import { TextClassList } from "@/types/textClassList.enum";

const CartBody: FC = () => {
    const [totalPrice, setTotalPrice] = useState<number>();
    const cart = useAppSelector((select) => select.cart.productsArray);
    const products = useFetchProductsById(cart);

    useEffect(() => {
        const productsPriceArr = products.map(
            ({ amount, mainPrice }) => (amount ?? 1) * mainPrice
        );

        if (productsPriceArr.length > 0) {
            const totalPriceReceived = productsPriceArr.reduce(
                (accumulator, currentValue) => {
                    return accumulator + currentValue;
                }
            );
            setTotalPrice(totalPriceReceived);
        }
    }, [products]);

    if ((!cart || cart.length === 0) && (!products || products.length === 0)) {
        return (
            <div
                className={`${TextClassList.REGULAR_22} ${classes["cart__message"]}`}
            >
                The cart is empty
            </div>
        );
    }

    return (
        <div>
            <div className={classes["cart__wrapper"]}>
                <div className={`${classes["cart__table"]}`}>
                    <div className={ButtonClassList.BUTTON_SMALL}>Product</div>
                    <div className={ButtonClassList.BUTTON_SMALL}>Quantity</div>
                    <div className={ButtonClassList.BUTTON_SMALL}>Price</div>
                    <div className={ButtonClassList.BUTTON_SMALL}>Subtotal</div>
                </div>
                {products.map((product, index) => (
                    <CartPreview
                        key={index}
                        productID={product.id}
                        amount={product.amount}
                        description={product.description}
                        mainPrice={product.mainPrice}
                        title={product.title}
                    />
                ))}
            </div>
            <div className={classes["cart__summary-wrapper"]}>
                <div className={classes["cart__summary"]}>
                    <span className={ButtonClassList.BUTTON_LARGE}>
                        Cart summary
                    </span>
                    <div className={classes["cart__summary-price"]}>
                        <span className={TextClassList.SEMIBOLD_18}>Total</span>
                        <span className={TextClassList.SEMIBOLD_18}>
                            ${totalPrice}
                        </span>
                    </div>
                    <LinkCustom
                        href={{ endpoint: "/checkout" }}
                        styleSettings={{
                            type: "DEFAULT",
                            size: "MEDIUM",
                            fill: "SOLID",
                            color: "DARK",
                            roundness: "ROUNDED",
                        }}
                    >
                        Checkout
                    </LinkCustom>
                </div>
            </div>
        </div>
    );
};

export default CartBody;
