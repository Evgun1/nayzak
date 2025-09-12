import { ReactNode, RefObject } from "react";
import classes from "./ButtonCustom.module.scss";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import IconsIdList from "@/components/icons/IconsIdList";

export enum Color {
	dark_default = "color-default--dark",
	light_default = "color-default--light",
	dark_text = "color-text--dark",
	light_text = "color-text--light",
	dark_underline = "color-underline--dark",
	light_underline = "color-underline--light",
}

export enum Size {
	XL = `size--xl ${ButtonClassList.BUTTON_X_LARGE}`,
	L = `size--l ${ButtonClassList.BUTTON_LARGE}`,
	M = `size--m ${ButtonClassList.BUTTON_MEDIUM}`,
	S = `size--s ${ButtonClassList.BUTTON_SMALL}`,
	XS = `size--xs ${ButtonClassList.BUTTON_X_SMALL}`,
}

export enum Rounded {
	pill = "roundness--pill",
	rounded = "roundness--rounded",
	sharp = "roundness--sharp",
}

export enum Type {
	default = "type--default",
	circle = "type--circle",
	text = "type--text",
	underline = "type--underline",
}

export interface IconInterface {
	icon_left?: IconsIdList;
	icon_right?: IconsIdList;
}
