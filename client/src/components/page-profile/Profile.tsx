"use client";

import React, { ReactNode, useCallback, useEffect, useState } from "react";
import Orders from "./orders/Orders";
import AccountDetails from "./account-details/AccountDetails";
import classes from "./Profile.module.scss";
import { ButtonCustom } from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import { useAppDispatch } from "@/lib/redux/redux";
import { useRouter, redirect } from "next/navigation";
import { cartAction } from "@/lib/redux/store/cart/cart";
import Wishlist from "./wishlist/Wishlist";
import { logOutActive } from "@/lib/redux/store/auth/action";
import { useCookieGet } from "@/hooks/useCookie";
import Addresses from "./addresses/Addresses";
import Image from "next/image";
import Tabs from "@/lib/ui/tabs/Tabs";
import dynamic from "next/dynamic";
import loading from "@/app/loading";
import { initAddress } from "@/lib/redux/store/address/action";
import { initWishlist } from "@/lib/redux/store/wishlist/action";
import { initCart } from "@/lib/redux/store/cart/action";
import { initOrders } from "@/lib/redux/store/orders/action";

type PageContentType = {
    label: string;
    content: ReactNode;
};

const AccountDetailsDynamic = dynamic(
    () => import("./account-details/AccountDetails"),
    {
        ssr: false,
        loading: () => (
            <div className={classes["loading"]}>
                <div className={classes["loading__spinner"]}></div>
            </div>
        ),
    }
);
const AddressDynamic = dynamic(() => import("./addresses/Addresses"), {
    ssr: false,
    loading: () => (
        <div className={classes["loading"]}>
            <div className={classes["loading__spinner"]}></div>
        </div>
    ),
});
const WishlistDynamic = dynamic(() => import("./wishlist/Wishlist"), {
    ssr: false,
    loading: () => (
        <div className={classes["loading"]}>
            <div className={classes["loading__spinner"]}></div>
        </div>
    ),
});
const OrdersDynamic = dynamic(() => import("./orders/Orders"), {
    ssr: false,
    loading: () => (
        <div className={classes["loading"]}>
            <div className={classes["loading__spinner"]}></div>
        </div>
    ),
});

const MENU: PageContentType[] = [
    {
        label: "Account details",
        content: <AccountDetailsDynamic />,
    },
    {
        label: "Addresses",
        content: <AddressDynamic />,
    },
    {
        label: "Wishlist",
        content: <WishlistDynamic />,
    },
    {
        label: "Orders",
        content: <OrdersDynamic />,
    },
];

export default function Profile() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [tabAction, setTabAction] = useState(0);

    const btnLogOutHandler = () => {
        dispatch(logOutActive());
        dispatch(cartAction.cleanCart());
        router.push("/");
    };

    useEffect(() => {
        (async () => {
            const userToken = await useCookieGet("user-token");
            if (!userToken) {
                redirect("/");
            }
        })();
    }, []);

    return (
        <div className={classes["profile"]}>
            <h3 className={classes["profile__header"]}>My account</h3>
            <div className={classes["profile__content"]}>
                <Tabs isVertical>
                    <Tabs.Header className={classes["profile__tabs-header"]}>
                        <div
                            className={
                                classes["profile-navigation__image-wrap"]
                            }
                        >
                            <Image
                                loading='lazy'
                                fill
                                className={classes["profile-navigation__image"]}
                                src='https://placehold.co/400'
                                alt='avatar'
                            />
                        </div>
                        {MENU.map((val, i) => (
                            <Tabs.Toggle key={i} index={i} label={val.label} />
                        ))}
                        <ButtonCustom
                            styleSettings={{
                                type: "TEXT",
                                color: "DARK",
                                size: "MEDIUM",
                            }}
                            className={classes["profile-navigation__button"]}
                            onClick={btnLogOutHandler}
                        >
                            Logout
                        </ButtonCustom>
                    </Tabs.Header>

                    <Tabs.Body>
                        {MENU.map((val, i) => (
                            <React.Fragment key={i}>
                                {val.content}
                            </React.Fragment>
                        ))}
                    </Tabs.Body>
                </Tabs>
            </div>
        </div>
    );
}
