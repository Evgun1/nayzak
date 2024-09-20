import { FC, MouseEventHandler, ReactNode, RefObject } from "react";

import DisplayIcon from "../../../../components/elemets/icons/displayIcon";

import "./style.scss";
import IconsIdList from "../../../../components/elemets/icons/IconsIdList";
import { Color, Roundness, Size, Type } from "./ButtonType";

export interface StyleSettingsObject {
  size: Size;
  roundess: Roundness;
  type: Type;
  color: { dark?: boolean; light?: boolean };
  icon?: {
    left?: IconsIdList;
    right?: IconsIdList;
  };
}

interface TypeObject {
  button: "button";
  reset: "reset";
  submit: "submit";
}

type SiteButtonProps = {
  styleSettings: StyleSettingsObject;
  className?: string | null;
  btnRef?: RefObject<HTMLButtonElement>;
  id?: string;
  children?: ReactNode;
  typeProperty?: "button" | "reset" | "submit";
  onClick?: () => void;
};

export const SiteButton: FC<SiteButtonProps> = ({
  styleSettings: { color, roundess, size, type, icon },
  className,
  children,
  btnRef,
  id,
  typeProperty,
  onClick,
}) => {
  let btnColor;

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
      id={id}
      ref={btnRef}
      onClick={onClick}
      className={`${className ?? ""} ${classes.join(" ")}`}
      type={typeProperty ?? "button"}
    >
      {icon?.left ? <DisplayIcon iconName={icon.left} /> : ""}
      {children ?? ""}
      {icon?.right ? <DisplayIcon iconName={icon.right} /> : ""}
    </button>
  );
};

export const ButtonCustom = {
  SiteButton,
  Size,
  Roundness,
  Type,
  IconsIdList,
};
