"use client";

import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
// import classes from "./DropDown.module.scss";
import classes from "./DropDown.module.scss";
interface DropDownItemProps extends ComponentPropsWithoutRef<"div"> {
	children: ReactNode;
	active?: boolean;
}

const DropDownBody: FC<DropDownItemProps> = ({ children, active = true }) => {
	return (
		<div
			id="drop-down__body"
			className={`${classes["drop-down__body"]} ${
				!active ? classes.disable : ""
			}`}
		>
			{children}
		</div>
	);
};

export default DropDownBody;
