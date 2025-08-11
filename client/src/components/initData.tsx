"use client";

import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { initAddress } from "@/redux/store/address/action";
import { initAuth } from "@/redux/store/auth/action";
import { initCart } from "@/redux/store/cart/action";
import { initCustomer } from "@/redux/store/customer/action";
import { initOrders } from "@/redux/store/orders/action";
import { initWishlist } from "@/redux/store/wishlist/action";
import { appCookieGet } from "@/lib/api/cookie";
import { retry } from "@reduxjs/toolkit/query";
import { useEffect, useLayoutEffect } from "react";
import { log } from "console";

const InitData = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			const token = await appCookieGet("user-token");

			if (token) dispatch(initAuth());
		})();
	}, [dispatch]);

	return null;
};

export default InitData;
