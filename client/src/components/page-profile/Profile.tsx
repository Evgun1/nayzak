"use server";

import React, { ReactNode } from "react";
import classes from "./Profile.module.scss";
import Image from "next/image";
import Tabs from "@/lib/ui/tabs/Tabs";
import Logout from "./Logout";
import AccountDetails from "./account-details/AccountDetails";
import Addresses from "./addresses/Addresses";
import Wishlist from "./wishlist/Wishlist";
import Orders from "./orders/Orders";

type PageContentType = {
    label: string;
    content: ReactNode;
};

const MENU: PageContentType[] = [
    {
        label: "Account details",
        content: <AccountDetails />,
    },
    {
        label: "Addresses",
        content: <Addresses />,
    },
    {
        label: "Wishlist",
        content: <Wishlist />,
    },
    {
        label: "Orders",
        content: <Orders />,
    },
    // {
    //     label: "Logout",
    //     content: <Logout />,
    // },
];

export default async function Profile() {
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
                        <Logout />
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
