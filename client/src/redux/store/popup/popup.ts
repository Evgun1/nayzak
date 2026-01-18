import { title } from "process";
import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export interface ListLinkItem {
	title: string;
	href: {
		queryParams: { [key: string]: string };
		deleteQueryParams?: string;
	};
}

export type ListLinkType = Array<ListLinkItem>;

type InitStateItem = {
	popupContent: ReactNode | null;
	listLink: ListLinkType;
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
		setListLink(state, action: PayloadAction<ListLinkType>) {
			state.listLink = action.payload;
		},
	},
});

export default popup.reducer;
export const popupActions = popup.actions;
