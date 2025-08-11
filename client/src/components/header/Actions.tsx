"use client";

import classes from "./Actions.module.scss";

import { useAppDispatch, useAppSelector } from "@/redux/redux";

import PopupSearch from "../../popups/popup-search/PopupSearch";
import { popupActions } from "@/redux/store/popup/popup";
import PopupAuth from "../../popups/popup-auth/PopupAuth";
import PopupError from "../../popups/popup-error/PopupError";
import { appCookieGet } from "@/lib/api/cookie";
import { FC, useEffect } from "react";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";

const Actions: FC = () => {
	const dispatch = useAppDispatch();
	const cartAmount = useAppSelector((selector) => selector.cart.totalAmount);
	const userData = useAppSelector((selector) => selector.auth.credentials);

	const token = appCookieGet("user-token");

	function btnAuthHandler() {
		return dispatch(popupActions.toggle(<PopupAuth />));
	}

	function btnSearchHandler() {
		return dispatch(popupActions.toggle(<PopupSearch />));
	}

	const btnClickCart = () => {
		dispatch(
			popupActions.toggle(
				<PopupError title="You need to log in to the site" />,
			),
		);
	};

	if (userData) {
		setTimeout(() => {
			dispatch(popupActions.toggle(null));
		}, 500);
	}

	return (
		<div className={classes["header-actions"]}>
			<ButtonCustom
				styleSettings={{
					type: "TEXT",
					color: "DARK",
					size: "LARGE",
					icon: { left: "SEARCH" },
				}}
				className={classes["header-actions__button"]}
				onClick={btnSearchHandler}
			/>

			<LinkCustom
				href={{ endpoint: userData !== null ? "/profile" : "#" }}
				onClick={userData !== null ? () => {} : btnAuthHandler}
				styleSettings={{
					roundness: "ROUNDED",
					fill: "SOLID",
					color: "DARK",
					icon: { left: "USER" },
					type: "TEXT",
					size: "LARGE",
				}}
				className={classes["header-actions__button"]}
			/>

			<LinkCustom
				href={{ endpoint: !userData ? "#" : "/cart" }}
				styleSettings={{
					roundness: "ROUNDED",
					color: "DARK",
					icon: { left: "BAG" },
					type: "TEXT",
					size: "LARGE",
				}}
				className={`${classes["header-actions__button"]} ${classes["header-actions__bag"]}`}
			>
				{cartAmount !== 0 && (
					<span className={classes["header-actions__bag-amount"]}>
						{cartAmount}
					</span>
				)}
			</LinkCustom>
		</div>
	);
};

export default Actions;
