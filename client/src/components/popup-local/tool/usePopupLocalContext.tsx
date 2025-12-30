"use client";
import { retry } from "@reduxjs/toolkit/query";
import classes from "../PopupLocal.module.scss";

import React, {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	RefObject,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

type PopupId = string | number;

export type PopupPayload = any;

type PopupLocalItem = {
	setPopup: Dispatch<SetStateAction<ReactNode | null>>;

	toggle?: "action" | "disable";
	setToggle: React.Dispatch<"action" | "disable">;
};

const PopupLocalContext = createContext<PopupLocalItem | undefined>(undefined);

export const PopupLocalProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const refOverlay = useRef() as RefObject<HTMLDivElement>;
	const [popup, setPopup] = useState<ReactNode | null>(null);
	const [toggle, setToggle] = useState<"action" | "disable">("action");

	useEffect(() => {
		const currentOverlay = refOverlay.current;
		if (!currentOverlay) return;
	}, []);

	useEffect(() => {
		if (popup) {
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = "visible";
		};
	}, [popup]);

	return (
		<PopupLocalContext.Provider value={{ setPopup, toggle, setToggle }}>
			{popup ? (
				<>
					<div id="popup-local">{popup}</div>
					<div
						id="overlay-local"
						ref={refOverlay}
					>
						<Overlay />
					</div>
				</>
			) : (
				<></>
			)}
			{children}
		</PopupLocalContext.Provider>
	);
};

export const usePopupLocalContext = () => {
	const ctx = useContext(PopupLocalContext);

	if (!ctx)
		throw new Error(
			"usePopupLocalContext must be used within a PopupLocalProvider",
		);
	return ctx;
};

const Overlay: FC = () => {
	const { toggle, setPopup: setTogglePopup } = usePopupLocalContext();

	const btnClickHandler = useCallback(() => {
		if (toggle === "action") return setTogglePopup(null);
		return undefined;
	}, [toggle]);

	// const { setTogglePopup } = usePopupLocalContext();
	// const btnClickHandler = () => {
	// 	setTogglePopup(null);
	// };
	return (
		<div
			id="overlay-inside"
			className={classes["overlay"]}
			onClick={btnClickHandler}
			// onClick={togglePopupHandler}
		></div>
	);
};
