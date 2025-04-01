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

    useEffect(() => {
        (async () => {
            const token = await appCookieGet("user-token");
            if (token) {
                dispatch(initAuth());
            }
        })();
    }, [dispatch]);

    return null;
};

export default InitData;
