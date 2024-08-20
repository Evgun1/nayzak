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
  XL = "btn-size--xl button-xlarge",
  L = "btn-size--l button-large",
  M = "btn-size--m button-medium",
  S = "btn-size--s button-small",
  XS = "btn-size--xs button-xsmall",
}

export enum Roundness {
  pill = "btn-roundness--pill",
  rounded = "btn-roundness--rounded",
  sharp = "btn-roundness--sharp",
}

export enum Type {
  default = "btn-type--default",
  circle = "btn-type--circle",
  text = "btn-type--text",
  underline = "btn-type--underline",
}

export interface IconInterface {
  icon_left?: IconsIdList;
  icon_right?: IconsIdList;
}
