"use client";

import { FC, ReactNode } from "react";
import classes from "./PopupPreview.module.scss";
import { useAppDispatch } from "@/redux/redux";
import { popupActions } from "@/redux/store/popup/popup";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";

type PopupPreviewProps = {
	children: ReactNode;
	title: string;
};

const PopupPreview: FC<PopupPreviewProps> = ({ children, title }) => {
	const dispatch = useAppDispatch();

	return (
		<div className={classes["popup__preview"]}>
			<div className={classes["popup__header"]}>
				<h4>{title}</h4>
				<ButtonCustom
					className={classes["popup__header-btn"]}
					styleSettings={{
						color: "LIGHT",
						type: "SQUARE",
						fill: "SOLID",
						roundness: "SHARP",
						size: "X_LARGE",
						icon: { left: "CLOSE" },
					}}
					onClick={() => dispatch(popupActions.toggle(null))}
				/>
			</div>
			{children}
		</div>
	);
};

export default PopupPreview;
