"use client";

import classes from "./HeaderAction.module.scss";

import { useAppDispatch, useAppSelector } from "@/redux/redux";

import { popupActions } from "@/redux/store/popup/popup";
import { FC, useEffect, useMemo, useState } from "react";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import PopupAuth from "@/popups/popup-auth/PopupAuth";
import PopupSearch from "@/popups/popup-search/PopupSearch";
import PopupError from "@/popups/popup-error/PopupError";

const HeaderAction: FC = () => {
	const dispatch = useAppDispatch();
	const cartSelector = useAppSelector((selector) => selector.cart);
	const userData = useAppSelector((selector) => selector.auth.credentials);

	const [cartAmount, setCartAmount] = useState(0);

	function btnAuthHandler() {
		return dispatch(popupActions.toggle(<PopupAuth />));
	}

	function btnSearchHandler() {
		return dispatch(popupActions.toggle(<PopupSearch />));
	}

	// const btnClickCart = () => {
	// 	dispatch(
	// 		popupActions.toggle(
	// 			<PopupError title="You need to log in to the site" />,
	// 		),
	// 	);
	// };

	useEffect(() => {
		setCartAmount(cartSelector.totalAmount);
	}, [cartSelector]);

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

export default HeaderAction;
