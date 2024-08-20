import { ReactNode, RefObject } from "react";
import IconsIdList from "../../../../components/elemets/icons/IconsIdList";
import classes from "./ButtonCustom.module.scss";

export enum Color {
  dark_default = "color-default--dark",
  light_default = "color-default--light",
  dark_text = "color-text--dark",
  light_text = "color-text--light",
  dark_underline = "color-underline--dark",
  light_underline = "color-underline--light",
}

export enum Size {
  XL = "link-size--xl button-xlarge",
  L = "link-size--l button-large",
  M = "link-size--m button-medium",
  S = "link-size--s button-small",
  XS = "link-size--xs button-xsmall",
}

export enum Roundness {
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
