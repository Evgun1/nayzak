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
	XL = `link-size--xl ${ButtonClassList.BUTTON_X_LARGE}`,
	L = `link-size--l ${ButtonClassList.BUTTON_LARGE}`,
	M = `link-size--m ${ButtonClassList.BUTTON_MEDIUM}`,
	S = `link-size--s ${ButtonClassList.BUTTON_SMALL}`,
	XS = `link-size--xs ${ButtonClassList.BUTTON_X_SMALL}`,
}

export enum Rounded {
	pill = "link-roundness--pill",
	rounded = "link-roundness--rounded",
	sharp = "link-roundness--sharp",
}

export enum Type {
	default = "link-type--default",
	circle = "link-type--circle",
	text = "link-type--text",
	underline = "link-type--underline",
}

export interface IconInterface {
	icon_left?: IconsIdList;
	icon_right?: IconsIdList;
}
