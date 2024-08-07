import { FC, MouseEventHandler, ReactNode, RefObject } from "react";

import DisplayIcon from "../../icons/displayIcon";

import "./style.scss";
import IconsIdList from "../../icons/IconsIdList";
import { Color, Roundness, Size, Type } from "./ButtonType";

export interface StyleSettingsObject {
  size: Size;
  roundess: Roundness;
  type: Type;
  color: { dark?: boolean; light?: boolean };
  icon?: IconsIdList;
}

type SiteButtonProps = {
  styleSettings: StyleSettingsObject;
  className?: string;
  btnRef?: RefObject<HTMLButtonElement>;
  children?: ReactNode;
  onClick?: MouseEventHandler;
};

export const SiteButton: FC<SiteButtonProps> = ({
  styleSettings,
  className,
  children,
  btnRef,
  onClick,
}) => {
  let btnColor;
  const { color, size, roundess, type, icon } = styleSettings;

  if (type === Type.default || type === Type.circle) {
    color?.dark
      ? (btnColor = Color.dark_default)
      : (btnColor = Color.light_default);
  }

  if (type === Type.text) {
    color?.dark ? (btnColor = Color.dark_text) : (btnColor = Color.light_text);
  }

  if (type === Type.underline) {
    color?.dark
      ? (btnColor = Color.dark_underline)
      : (btnColor = Color.light_underline);
  }

  const classes: any[] = [btnColor, size, roundess, type];

  return (
    <button
      id="custom-button"
      ref={btnRef}
      onClick={onClick}
      className={`${className} ${classes.join(" ")}`}
    >
      {children ?? ""}
      {icon ? <DisplayIcon iconName={icon} /> : ""}
    </button>
  );
};

export default {
  SiteButton,
  Color,
  Size,
  Roundness,
  Type,
  IconsIdList,
};
