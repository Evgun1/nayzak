"use client";

import { ReactNode, useEffect, useState } from "react";
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

type PageContentType = {
    label: string;
    content: () => ReactNode;
};

const MENU: PageContentType[] = [
    {
        label: "Account details",
        content: () => <AccountDetails />,
    },
    {
        label: "Addresses",
        content: () => <Addresses />,
    },
    {
        label: "Wishlist",
        content: () => <Wishlist />,
    },
    {
        label: "Orders",
        content: () => <Orders />,
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
        return;
    });

    return (
        <div className={classes["profile"]}>
            <h3 className={classes["profile__header"]}>My account</h3>
            <div className={classes["profile__content"]}>
                <div className={classes["profile-navigation"]}>
                    <img
                        className={classes["profile-navigation__image"]}
                        src='https://placehold.co/400'
                        alt='avatar'
                    />

                    <ul className={classes["profile-navigation__list"]}>
                        {MENU &&
                            MENU.length > 0 &&
                            MENU.map((data, index) => (
                                <li
                                    key={index}
                                    className={
                                        classes["profile-navigation__list-item"]
                                    }
                                >
                                    <ButtonCustom
                                        styleSettings={{
                                            type: "TEXT",
                                            color: "DARK",
                                            size: "MEDIUM",
                                        }}
                                        onClick={() => setTabAction(index)}
                                        className={`${
                                            index === tabAction
                                                ? classes[
                                                      "profile-navigation__button--action"
                                                  ]
                                                : classes[
                                                      "profile-navigation__button"
                                                  ]
                                        }`}
                                    >
                                        {data.label}
                                    </ButtonCustom>
                                </li>
                            ))}
                        <li
                            className={classes["profile-navigation__list-item"]}
                        >
                            <ButtonCustom
                                styleSettings={{
                                    type: "TEXT",
                                    color: "DARK",
                                    size: "MEDIUM",
                                }}
                                className={
                                    classes["profile-navigation__button"]
                                }
                                onClick={btnLogOutHandler}
                            >
                                Logout
                            </ButtonCustom>
                        </li>
                    </ul>
                </div>
                <div className={classes["profile-content"]}>
                    {MENU[tabAction].content()}

                    {/* {MENU.map((menuItem, index) => (
                        <div key={index}>
                            {index === tabAction ? menuItem.content() : <></>}
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );
}
