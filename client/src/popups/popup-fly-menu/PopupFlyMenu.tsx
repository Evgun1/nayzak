"use client";

import classes from "./PopupFlyMenu.module.scss";
import React, { FunctionComponent, useCallback, useEffect } from "react";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import MenuSearch from "./components/MenuSearch";
import MenuNavigation from "./components/MenuNavigation";
import MenuActions from "./components/MenuActions";
import { useSearchContext } from "./context/useSearchContext";
import dynamic from "next/dynamic";
import SearchProducts from "./components/MenuSearchProducts";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { popupActions } from "@/redux/store/popup/popup";
import PopupAuth from "../popup-auth/PopupAuth";
import { useRouter } from "next/navigation";

interface PopupFlyMenuProps {}

const LoaderProductsDynamic = dynamic(
	() => import("@/components/loader/products/LoaderProducts"),
	{ ssr: false },
);

const PopupFlyMenu: FunctionComponent<PopupFlyMenuProps> = () => {
	const { isOpen } = useSearchContext();
	const credentials = useAppSelector((state) => state.auth.credentials);
	const dispatch = useAppDispatch();
	const route = useRouter();

	const btnClickHandler = useCallback(() => {
		if (credentials !== null) return route.push("/profile");

		dispatch(popupActions.toggle(<PopupAuth />));
	}, [dispatch]);

	return (
		<div
			className={`${isOpen ? classes["popup-menu--search"] : ""} ${
				classes["popup-menu"]
			}`}
		>
			<MenuSearch />
			{isOpen ? (
				<SearchProducts />
			) : (
				<React.Fragment>
					<MenuNavigation />
					<MenuActions />
					<ButtonCustom
						className={`${classes["popup-menu__button"]}`}
						styleSettings={{
							type: "DEFAULT",
							color: "DARK",
							fill: "SOLID",
							size: "X_SMALL",
							roundness: "ROUNDED",
						}}
						onClick={btnClickHandler}
					>
						{credentials !== null ? "Profile" : "Sing in"}
					</ButtonCustom>
				</React.Fragment>
			)}
		</div>
	);
};

export default PopupFlyMenu;
