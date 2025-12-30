import { title } from "process";
import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export type ListLinkItem = {
	title: string;
	href: {
		queryParams: { [key: string]: string };
		deleteQueryParams?: string;
	};
}[];

type InitStateItem = {
	popupContent: ReactNode | null;
	listLink: ListLinkItem;
};

const initState: InitStateItem = {
	popupContent: null,
	listLink: [],
};

const popup = createSlice({
	name: "popup",
	initialState: initState,
	reducers: {
		toggle(state, action: PayloadAction<ReactNode | null>) {
			state.popupContent = action.payload;
		},
		setListLink(state, action: PayloadAction<ListLinkItem>) {
			state.listLink = action.payload;
		},
	},
});

export default popup.reducer;
export const popupActions = popup.actions;
