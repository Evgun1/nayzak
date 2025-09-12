import { ReactNode, RefObject } from "react";
import classes from "./ButtonCustom.module.scss";
import IconsIdList from "@/components/icons/IconsIdList";
import { ButtonClassList } from "@/types/buttonClassList.enum";

export enum Color {
	dark_default = "color-default--dark",
	light_default = "color-default--light",
	dark_text = "color-text--dark",
	light_text = "color-text--light",
	dark_underline = "color-underline--dark",
	light_underline = "color-underline--light",
}

export enum Size {
	X_LARGE = `size--xl ${ButtonClassList.BUTTON_X_LARGE}`,
	LARGE = `size--l ${ButtonClassList.BUTTON_LARGE}`,
	MEDIUM = `size--m ${ButtonClassList.BUTTON_MEDIUM}`,
	SMALL = `size--s ${ButtonClassList.BUTTON_SMALL}`,
	X_SMALL = `size--xs ${ButtonClassList.BUTTON_X_SMALL}`,
}

export enum Roundness {
	PILL = "roundness--pill",
	ROUNDED = "roundness--rounded",
	SHARP = "roundness--sharp",
}

export enum Type {
	DEFAULT = "type--default",
	CIRCLE = "type--circle",
	text = "type--text",
	underline = "type--underline",
}

export interface IconInterface {
	icon_left?: IconsIdList;
	icon_right?: IconsIdList;
}
