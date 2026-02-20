"use client";

import { FunctionComponent, useState } from "react";
import classes from "./Burger.module.scss";
import ButtonCustom from "../custom-elements/button-custom/ButtonCustom";
import { useAppDispatch } from "@/redux/redux";
import { popupActions } from "@/redux/store/popup/popup";

interface BurgerProps {
	toggle: any;
}

const Burger: FunctionComponent<BurgerProps> = (props) => {
	const [burgerActive, setBurgerActive] = useState(false);
	const dispatch = useAppDispatch();

	function onClick() {
		setBurgerActive((prev) => !prev);
		dispatch(popupActions.toggle(props.toggle));
	}

	return (
		<ButtonCustom
			onClick={onClick}
			className={` ${burgerActive ? classes["burger--active"] : ""} ${
				classes["burger"]
			}`}
			styleSettings={{ type: "DEFAULT", color: "DARK" }}
		>
			<span className={classes["burger__line"]}></span>
			<span className={classes["burger__line"]}></span>
		</ButtonCustom>
	);
};

export default Burger;
