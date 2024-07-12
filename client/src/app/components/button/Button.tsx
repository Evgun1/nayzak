import Link from "next/link";
import style from "./Button.module.scss";
import { FC, ReactNode } from "react";

interface ColorInterface {
  dark?: boolean;
  light?: boolean;
}

interface SizeInterface {
  xlarge?: boolean;
  large?: boolean;
  medium?: boolean;
  small?: boolean;
  xsmall?: boolean;
}

interface RoundnessInterface {
  pill?: boolean;
  rounded?: boolean;
}

interface SquareInterface {
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
}

interface TypeInterface {
  default?: boolean;
  square?: SquareInterface;
  text?: boolean;
}

type SiteButtonProps = {
  size: SizeInterface;
  roundess?: RoundnessInterface;
  type: TypeInterface;
  color: ColorInterface;
  children?: ReactNode;
};

export const SiteButton: FC<SiteButtonProps> = ({
  color,
  size,
  roundess,
  type,
  children,
}) => {
  const classes = [];

  if (color.dark) {
    type.text
      ? classes.push(style["text-dark"])
      : classes.push(style["btn-dark"]);
  }
  if (color.light) {
    type.text
      ? classes.push(style["text-light"])
      : classes.push(style["btn-light"]);
  }

  // if (size.xlarge) {
  //   classes.push("button-xlarge");
  // }
  // if (size.large) {
  //   classes.push("button-large");
  // }
  // if (size.medium) {
  //   classes.push("button-medium");
  // }
  // if (size.small) {
  //   classes.push("button-small");
  // }
  // if (size.xsmall) {
  //   classes.push("button-xsmall");
  // }

  if (type.default && roundess?.rounded) {
    classes.push(
      roundess?.rounded
        ? `${style["roundess-rounded"]} ${style["btn-default"]}`
        : style["btn-default"]
    );
  }
  if (type.default && roundess?.pill) {
    classes.push(
      roundess?.pill
        ? `${(style["roundess-pill"], style["btn-default"])}`
        : style["btn-default"]
    );
  }

  if (type.default) {
    classes.push(style["btn-default"]);
    if (size.xlarge) {
      classes.push("button-xlarge");
    }
    if (size.large) {
      classes.push("button-large");
    }
    if (size.medium) {
      classes.push("button-medium");
    }
    if (size.small) {
      classes.push("button-small");
    }
    if (size.xsmall) {
      classes.push("button-xsmall");
    }
  }

  if (type.square) {
    if (type.square.left) {
      classes.push(style["square-left"]);
    }
    if (type.square.top) {
      classes.push(style["square-top"]);
    }
    if (type.square.right) {
      classes.push(style["square-right"]);
    }
    if (type.square.bottom) {
      classes.push(style["square-bottom"]);
    }
  }

  return (
    <Link href={"#"} className={`${style.btn} ${classes.join(" ")}`}>
      {children ?? ""}
    </Link>
  );
};
