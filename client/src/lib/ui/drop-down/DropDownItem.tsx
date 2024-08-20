// "use client";

import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import classes from "./DropDown.module.scss";
interface DropDownItemProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

const DropDownItem: FC<DropDownItemProps> = ({ children }) => (
  <div className={classes["drop-down--item"]}>{children}</div>
);

export default DropDownItem;
