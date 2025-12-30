"use client";

import { TypeList } from "@/app/(shop)/category/[category]/[subcategory]/@toolbar/components/SelectTypeList";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { initAuth } from "@/redux/store/auth/action";
import { responsiveActions } from "@/redux/store/responsive";

import { appCookieGet, appCookieSet } from "@/tools/cookie";
import { useEffect } from "react";

const InitData = () => {
	const dispatch = useAppDispatch();
	const responsive = useAppSelector((state) => state.responsive);

	useEffect(() => {
		console.log(responsive);

		appCookieSet({
			name: "default-list-type",
			value:
				responsive.isDesktop || responsive.isTablet
					? TypeList.FIVE
					: TypeList.TWO,
		});
	}, [responsive]);

	useEffect(() => {
		dispatch(initAuth());
		// dispatch(responsiveActions.init());
	}, [dispatch]);

	useEffect(() => {
		const windowResizeHandler = () => dispatch(responsiveActions.update());
		window.addEventListener("resize", windowResizeHandler);
		return () => {
			window.removeEventListener("resize", windowResizeHandler);
		};
	}, [dispatch]);
	return null;
};

export default InitData;
