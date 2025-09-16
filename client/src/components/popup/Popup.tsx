"use client";

import React, { FC, useEffect, useState } from "react";
import classes from "./Popup.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { createPortal } from "react-dom";
import { popupActions } from "@/redux/store/popup/popup";

const Popup: FC = () => {
	const popupContent = useAppSelector((state) => state.popup.popupContent);
	const [popupElement, setPopupElement] = useState<Element>();
	const [overlayElement, setOverlayElement] = useState<Element>();

	useEffect(() => {
		setPopupElement(document.getElementById("popup") as Element);
		setOverlayElement(document.getElementById("overlay") as Element);
		document.body.classList.toggle("popup-is-open", popupContent !== null);

		if (popupContent) {
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.body.style.overflow = "visible";
			document.body.classList.remove("popup-is-open");
		};
	}, [popupContent]);

	return (
		<>
			{popupContent && (
				<>
					{popupElement && createPortal(popupContent, popupElement)}
					{overlayElement &&
						createPortal(<Overlay />, overlayElement)}
				</>
			)}
		</>
	);
};

const Overlay: FC = () => {
	const dispatch = useAppDispatch();
	const togglePopupHandler = () => {
		dispatch(popupActions.toggle(null));
	};

	return (
		<div
			className={classes.overlay}
			onClick={togglePopupHandler}
		></div>
	);
};

export default Popup;
