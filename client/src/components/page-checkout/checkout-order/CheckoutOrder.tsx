"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";
import classes from "./CheckoutOrder.module.scss";
import useFetchProductsById from "@/hooks/useFetchProductByID";
import { TextClassList } from "@/types/textClassList.enum";
import { RefObject, useEffect, useId, useRef, useState } from "react";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import CheckoutOrderProduct from "./CheckoutOrderProduct";

const CheckoutOrder = () => {
    const cart = useAppSelector((state) => state.cart.productsArray);
    const products = useFetchProductsById(cart);
    const [totalPrice, setTotalPrice] = useState<number>();

    const orderRef = useRef() as RefObject<HTMLDivElement>;
    const generateId = Symbol("order-header");

    const eventListenerHandler = (event: Event) => {
        const target = event.target as HTMLElement;
        if (!target) return;
        const wrapper = target.closest(`#${generateId.description}`);
        if (!wrapper) return;

        if (products.length > 3) {
            if (event.type === "mouseenter") {
                wrapper.classList.add(
                    classes["order__products-wrapper--scrollbar"]
                );
            }
            if (event.type === "mouseleave") {
                wrapper.classList.remove(
                    classes["order__products-wrapper--scrollbar"]
                );
            }
        }
    };

    useEffect(() => {
        const prices = products.map(
            (data) => (data.amount ?? 1) * data.mainPrice
        );

        if (prices.length > 0) {
            const currentTotalPrice = prices.reduce(
                (previous, current) => previous + current
            );
            setTotalPrice(currentTotalPrice);
        }
    }, [products]);

    useEffect(() => {
        if (products.length >= 3) {
            document
                .querySelectorAll(`#${generateId.description}`)
                .forEach((val) => {
                    val?.addEventListener("mouseenter", eventListenerHandler);
                    val?.addEventListener("mouseleave", eventListenerHandler);
                });

            return () => {
                document.removeEventListener(
                    "mouseenter",
                    eventListenerHandler
                );
                document.removeEventListener(
                    "mouseleave",
                    eventListenerHandler
                );
            };
        }
    }, [products]);

    return (
        <div className={classes["order"]}>
            <input
                type='hidden'
                name='cartId'
                value={cart.map((data) => data.id).join(",")}
            />
            <div
                className={`${ButtonClassList.BUTTON_LARGE} ${classes["order__header"]}`}
            >
                Order summary
            </div>
            <div
                ref={orderRef}
                className={classes["order__products-wrapper"]}
                id={generateId.description}
            >
                {products &&
                    products.length > 0 &&
                    products.map((product, i) => (
                        <CheckoutOrderProduct product={product} key={i} />
                    ))}
            </div>

            <div className={classes["order__fields"]}>
                <div className={classes["order__fields-filed"]}>
                    <span className={TextClassList.SEMIBOLD_18}>Total</span>
                    <span className={TextClassList.SEMIBOLD_18}>
                        ${totalPrice}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CheckoutOrder;
