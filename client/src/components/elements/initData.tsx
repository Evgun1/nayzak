"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";
import { initAddress } from "@/lib/redux/store/address/action";
import { initAuth } from "@/lib/redux/store/auth/action";
import { initCart } from "@/lib/redux/store/cart/action";
import { initCustomer } from "@/lib/redux/store/customer/action";
import { initOrders } from "@/lib/redux/store/orders/action";
import { initWishlist } from "@/lib/redux/store/wishlist/action";
import { appCookieGet } from "@/utils/http/cookie";
import { retry } from "@reduxjs/toolkit/query";
import { useEffect, useLayoutEffect } from "react";

const InitData = () => {
    const dispatch = useAppDispatch();
    const init = async () => {
        const token = await appCookieGet("user-token");
        new Promise<void>((resolve) => {
            if (token) {
                resolve(dispatch(initAuth()));
            }
        });
    };
    useEffect(() => {
        (async () => {
            await Promise.all([init()]);
        })();
    }, [dispatch]);

    return null;
};

export default InitData;
