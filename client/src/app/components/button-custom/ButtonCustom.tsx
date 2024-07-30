import Link from "next/link";
import { FC, MouseEventHandler, ReactNode, RefObject } from "react";
import "./ButtonCustom.scss";
import IconsIdList from "../icons/IconsIdList";
import DisplayIcon from "../icons/displayIcon";

export enum Color {
  dark = "btn-color--dark",
  light = "btn-color--light",
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

// interface SquareInterface {
//   left?: boolean;
//   right?: boolean;
//   top?: boolean;
//   bottom?: boolean;
// }

export enum Type {
  default = "btn-type--default",
  circle = "btn-type--circle",
  text = "btn-type--text",
  underline = "btn-type--underline",
}

interface ElementInterface {
  link?: string;
  button?: MouseEventHandler;
}

interface IconInterface {
  icon_left?: IconsIdList;
  icon_right?: IconsIdList;
}

type SiteButtonProps = {
  size: Size;
  roundess?: Roundness;
  type: Type;
  color?: Color;
  children?: ReactNode;
  className?: string;
  btnRef?: RefObject<HTMLButtonElement>;
  element: ElementInterface;
  icon?: IconInterface;
};

export const SiteButton: FC<SiteButtonProps> = ({
  color = Color.dark,
  size = Size.XL,
  roundess = Roundness.sharp,
  type = Type.default,
  children,
  element,
  className,
  btnRef,
  icon,
}) => {
  const classes: any[] = [color, size, roundess, type];

  return element?.link ? (
    <Link
      scroll
      href={element.link}
      className={`${className} ${classes.join(" ")}`}
    >
      {icon?.icon_left ? <DisplayIcon iconName={icon.icon_left} /> : ""}
      {children ?? ""}
      {icon?.icon_left ? <DisplayIcon iconName={icon.icon_left} /> : ""}
    </Link>
  ) : (
    <button
      id="custom-button"
      ref={btnRef}
      onClick={element?.button}
      className={`${className} ${classes.join(" ")}`}
    >
      {icon?.icon_left ? <DisplayIcon iconName={icon.icon_left} /> : ""}
      {children ?? ""}
      {icon?.icon_left ? <DisplayIcon iconName={icon.icon_left} /> : ""}
      {icon?.icon_right ? <DisplayIcon iconName={icon.icon_right} /> : ""}
    </button>
  );
};

export default {
  SiteButton,
  Color,
  Size,
  Roundness,
  Type,
};
