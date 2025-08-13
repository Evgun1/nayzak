"use client";

import { useAppDispatch } from "@/redux/redux";
import { initAuth } from "@/redux/store/auth/action";

import { appCookieGet } from "@/lib/api/cookie";
import { useEffect } from "react";

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
