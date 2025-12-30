"use client";

import React, {
	FC,
	ReactElement,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from "react";
import classes from "./Popup.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { createPortal } from "react-dom";
import { popupActions } from "@/redux/store/popup/popup";
import { PopupProvider, usePopupContext } from "./context/usePopupContext";

const Popup: FC<{ popupChildren?: ReactNode }> = (props) => {
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
				<PopupProvider>
					{popupElement && createPortal(popupContent, popupElement)}
					{overlayElement &&
						createPortal(<Overlay />, overlayElement)}
				</PopupProvider>
			)}
		</>
	);
};

const Overlay: FC = () => {
	const dispatch = useAppDispatch();
	const { toggle } = usePopupContext();

	const togglePopupHandler = useCallback(() => {
		if (toggle === "action") return dispatch(popupActions.toggle(null));
		return undefined;
	}, [toggle, dispatch]);

	return (
		<div
			id="overlay-inside"
			className={classes.overlay}
			onClick={togglePopupHandler}
		></div>
	);
};

export default Popup;
