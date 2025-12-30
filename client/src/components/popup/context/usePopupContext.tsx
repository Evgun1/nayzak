"use client";

import { useAppDispatch } from "@/redux/redux";
import { popupActions } from "@/redux/store/popup/popup";
import React, {
	createContext,
	useContext,
	ReactNode,
	useState,
	SetStateAction,
} from "react";

export type PopupOptions = {};

export type PopupContextValue = {
	toggle?: "action" | "disable";
	setToggle: React.Dispatch<"action" | "disable">;
};

const PopupContext = createContext<PopupContextValue | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [toggle, setToggle] = useState<"action" | "disable">("action");

	return (
		<PopupContext.Provider
			value={{
				setToggle,
				toggle,
			}}
		>
			{children}
		</PopupContext.Provider>
	);
};

export function usePopupContext(): PopupContextValue {
	const ctx = useContext(PopupContext);
	if (!ctx) {
		throw new Error(
			"useOverlayContext must be used within a OverlayProvider",
		);
	}
	return ctx;
}
