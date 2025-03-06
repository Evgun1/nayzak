"use client";

import { OrdersItem } from "@/types/orders.types";
import { TextClassList } from "@/types/textClassList.enum";
import classes from "./OrdersPreview.module.scss";
import { useEffect, useState } from "react";
import ButtonCustom from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import LinkCustom from "@/lib/ui/custom-elements/link-custom/LinkCustom";
import { ProductItem } from "@/types/product.types";
import { appOneProductGet } from "@/utils/http/products";
import { appAddressesOneGet, appAddressesPost } from "@/utils/http/addresses";
import { AddressItem } from "@/types/addresses.types";
import { appCustomersOneGet } from "@/utils/http/customer";
import { CustomerItem } from "@/types/customer.types";
import Accordion from "@/lib/ui/accordion/Accordion";

export const OrdersPreview = (props: { order: Partial<OrdersItem> }) => {
    const { order } = props;

    const [product, setProduct] = useState<ProductItem>();
    const [address, setAddress] = useState<AddressItem>();
    const [customer, setCustomer] = useState<CustomerItem>();

    const dateObject = new Date(`${order.createdAt}`);

    const date = dateObject.toLocaleString("en-us", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const orderStatus =
        (order.status?.charAt(0).toLocaleUpperCase() as string) +
        (order.status?.slice(1) as string);

    useEffect(() => {
        (async () => {
            if (!order.productsId) return;
            const productFetch = await appOneProductGet(order.productsId);

            if (!order.addressesId) return;
            const addressFetch = await appAddressesOneGet({
                addressesParams: order.addressesId,
            });

            if (!order.customersId) return;
            const customerFetch = await appCustomersOneGet(
                order.customersId.toString()
            );

            setCustomer(customerFetch);
            setAddress(addressFetch);
            setProduct(productFetch);
        })();
    }, [order]);

    return (
        <Accordion className={classes["orders-preview"]}>
            <Accordion.Header className={classes["orders-preview__header"]}>
                <span className={`${TextClassList.SEMIBOLD_18} `}>
                    #{order.id}
                </span>
                <div className={`${TextClassList.REGULAR_18} `}>{date}</div>
                <div className={`${TextClassList.REGULAR_18} `}>
                    {orderStatus}
                </div>
                <div className={`${TextClassList.REGULAR_18} `}>
                    ${order.price}
                </div>
                <ButtonCustom
                    styleSettings={{
                        color: "DARK",
                        type: "TEXT",
                        size: "MEDIUM",
                        icon: { left: "CARET_DOWN" },
                    }}
                />
            </Accordion.Header>
            <Accordion.Body>
                <div className={classes["orders-preview__info"]}>
                    <div
                        className={`${classes["orders-preview__product-wrap"]}`}
                    >
                        <LinkCustom
                            className={`${classes["orders-preview__product"]}`}
                            styleSettings={{
                                type: "TEXT",
                                color: "DARK",
                                roundness: "PILL",
                                size: "SMALL",
                            }}
                            href={{
                                endpoint: `product/${product?.title.replaceAll(
                                    " ",
                                    "_"
                                )}`,
                            }}
                        >
                            <div
                                className={
                                    classes["orders-preview__image-wrap"]
                                }
                            >
                                <img
                                    className={classes["orders-preview__image"]}
                                    src='https:placehold.co/400'
                                    alt=''
                                />
                            </div>
                            <div
                                className={
                                    classes["orders-preview__product-title"]
                                }
                            >
                                {product?.title}
                            </div>
                            <div>Amount {order.amount}</div>
                            <div>${product?.mainPrice}</div>
                        </LinkCustom>
                    </div>

                    <div className={classes["orders-preview__address"]}>
                        <span>City</span>
                        <span>{address?.city}</span>
                        <span>Street</span>
                        <span>{address?.street}</span>
                        <span>Postal Code</span>
                        <span>{address?.postalCode}</span>
                    </div>

                    <div className={classes["orders-preview__customer"]}>
                        <span>User name</span>
                        <div
                            className={classes["orders-preview__customer-name"]}
                        >
                            <span>{customer?.firstName}</span>
                            <span>{customer?.lastName}</span>
                        </div>
                        <span>Phone</span>
                        <span>{customer?.phone}</span>
                    </div>
                </div>
            </Accordion.Body>
        </Accordion>
    );
};
