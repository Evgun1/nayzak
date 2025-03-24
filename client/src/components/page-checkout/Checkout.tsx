"use client";

import classes from "./Checkout.module.scss";
import CheckoutForms from "./checkout-forms/CheckoutForms";
import CheckoutOrder from "./checkout-order/CheckoutOrder";
import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";
import { FormEvent, useEffect, useState } from "react";
import Form from "../elements/form-component/FormComponent";
import ButtonCustom from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import { ordersUploadItem } from "@/utils/http/orders";
import { uploadOrders } from "@/lib/redux/store/orders/action";
import { useRouter, redirect, RedirectType } from "next/navigation";
import { writeCustomerAction } from "@/lib/redux/store/customer/action";
import { z, ZodObject } from "zod";
import { validation } from "@/utils/validator/validator";

const schemaCustomersArr: Array<ZodObject<any>> = [];
schemaCustomersArr.push(z.object({ ...validation.customer }));
const Checkout = () => {
    const route = useRouter();
    const cart = useAppSelector((state) => state.cart.productsArray);
    const dispatch = useAppDispatch();

    const submitHandler = (
        value: {
            data: ordersUploadItem & {
                firstName: string;
                lastName: string;
                phone: string;
            };
        },
        event: FormEvent
    ) => {
        const objectValue = value.data;
        const ordersItem = {} as ordersUploadItem;

        const customerFormData = new FormData();
        for (const key in objectValue) {
            const typeKey = key as keyof typeof objectValue;
            if (
                typeKey === "firstName" ||
                typeKey === "lastName" ||
                typeKey === "phone"
            ) {
                if (objectValue[typeKey]) {
                    customerFormData.set(
                        typeKey,
                        objectValue[typeKey].toString()
                    );
                }
            }

            if (typeKey.includes("Id")) {
                if (objectValue[typeKey].toString().split(",").length > 1) {
                    const idArr = objectValue[typeKey]
                        .toString()
                        .split(",")
                        .map(Number) as any;
                    ordersItem[typeKey as keyof ordersUploadItem] = idArr;
                    continue;
                }

                ordersItem[typeKey as keyof ordersUploadItem] = +objectValue[
                    typeKey
                ] as any;
            }
        }

        try {
            dispatch(uploadOrders(ordersItem));
            dispatch(writeCustomerAction(customerFormData));

            route.push("/");
        } catch (error) {}
    };

    useEffect(() => {
        if (cart.length === 0) redirect("/");
    }, [cart]);

    // if (typeof window !== undefined) {
    //     if (window.localStorage.getItem("order-status-code") === "200") {
    //         route.push("/", { scroll: true });
    //         setTimeout(() => {
    //             window.localStorage.removeItem("order-status-code");
    //         }, 100);
    //     }
    // }

    return (
        <div className={`container ${classes.checkout}`}>
            <h3 className={classes["checkout__header"]}>Checkout</h3>
            <Form
                schema={schemaCustomersArr}
                submitHandler={submitHandler}
                classe={classes["checkout__form"]}
            >
                <CheckoutForms />
                <CheckoutOrder />
                <ButtonCustom
                    typeProperty='submit'
                    styleSettings={{
                        fill: "SOLID",
                        type: "DEFAULT",
                        color: "DARK",
                        size: "MEDIUM",
                        roundness: "ROUNDED",
                    }}
                >
                    Place order
                </ButtonCustom>
            </Form>
        </div>
    );
};

export default Checkout;
