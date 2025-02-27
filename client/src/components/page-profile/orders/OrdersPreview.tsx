"use client";

import { OrdersItem } from "@/types/orders.types";
import { TextClassList } from "@/types/textClassList.enum";
import classes from "./OrdersPreview.module.scss";
import { useAppSelector } from "@/lib/redux/redux";
import useFetchProductsById from "@/hooks/useFetchProductByID";
import { RefObject, useEffect, useId, useRef, useState } from "react";
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
    // const [showProduct, setShowProduct] = useState<boolean>(false);

    const [product, setProduct] = useState<ProductItem>();
    const [address, setAddress] = useState<AddressItem>();
    const [customer, setCustomer] = useState<CustomerItem>();

    const dateObject = new Date(`${order.createdAt}`);
    const randomId = useId().replaceAll(":", "");
    const accordionRef = useRef() as RefObject<HTMLDivElement>;

    const date = dateObject.toLocaleString("en-us", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const orderStatus =
        (order.status?.charAt(0).toLocaleUpperCase() as string) +
        (order.status?.slice(1) as string);

    const eventListenerHandler = (event: MouseEvent) => {
        const target = event.target as HTMLDivElement;
        const currentAccordion = accordionRef.current;
        if (!target || !currentAccordion) return;

        if (target.closest(`#${randomId}`)) {
            const classList = currentAccordion.classList;

            const targetElement = target.closest("#accordion-header");

            if (targetElement) {
                console.log(targetElement);

                targetElement.classList.toggle(classes["accordion--visible"]);
                classList.toggle(classes["accordion--visible"]);
            }

            if (classList.contains(classes["accordion--visible"])) {
                currentAccordion.scrollHeight;
                currentAccordion.style.maxHeight = `${currentAccordion.scrollHeight}px`;
            } else {
                currentAccordion.style.maxHeight = "0";
            }
        }
    };

    useEffect(() => {
        (async () => {
            if (!order.productsId) return;
            const productFetch = await appOneProductGet(order.productsId);

            if (!order.addressesId) return;
            const address = await appAddressesOneGet({
                addressesParams: order.addressesId,
            });

            if (!order.customersId) return;
            const customerFetch = await appCustomersOneGet(
                order.customersId.toString()
            );

            setCustomer(customerFetch);
            setAddress(address);
            setProduct(productFetch);
        })();
    }, [order]);

    useEffect(() => {
        document.addEventListener("click", eventListenerHandler);
        return () =>
            document.removeEventListener("click", eventListenerHandler);
    }, []);

    return (
        <Accordion className={classes["orders"]}>
            <Accordion.Header>
                <div className={classes["orders__header"]}>
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
                        className={classes["preview__btn"]}
                    />
                </div>
            </Accordion.Header>
            <Accordion.Body>
                <div className={classes["orders__info"]}>
                    <LinkCustom
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
                        className={`${classes["orders__product"]}`}
                    >
                        <div className={classes["orders__product-img"]}>
                            <img src='https:placehold.co/400' alt='' />
                        </div>
                        <div className={classes["orders__product-title"]}>
                            {product?.title}
                        </div>
                        <div>Amount {order.amount}</div>
                        <div>${product?.mainPrice}</div>
                    </LinkCustom>

                    <div className={classes["orders__address"]}>
                        <span>City</span>
                        <span>{address?.city}</span>
                        <span>Street</span>
                        <span>{address?.street}</span>
                        <span>Postal Code</span>
                        <span>{address?.postalCode}</span>
                    </div>

                    <div className={classes["orders__customer"]}>
                        <span>User name</span>
                        <div className={classes["orders__customer-name"]}>
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
