"use clinet";

import { ChangeEventHandler, RefObject, useEffect, useRef } from "react";
import DisplayIcon from "../icons/displayIcon";
import IconsIdList from "../icons/IconsIdList";
import classes from "./InputPhone.module.scss";
import DropDown from "@/lib/ui/drop-down/DropDown";
import {
  Roundness,
  Size,
  Type,
} from "@/lib/ui/custom-elemets/button-custom/ButtonType";

type InputDefaultProps = {
  style: "line" | "contained";
};

export default function InputPhone({ style = "contained" }: InputDefaultProps) {
  const inputContainerRef = useRef(null) as RefObject<HTMLDivElement>;

  const handleFocus = () => {
    if (!inputContainerRef.current) return;
    inputContainerRef.current.classList.add(classes["input--focus"]);
  };

  const handleBlur = () => {
    if (!inputContainerRef.current) return;
    inputContainerRef.current.classList.remove(classes["input--focus"]);
  };

  return (
    <div
      ref={inputContainerRef}
      id="input-container"
      className={
        style === "contained"
          ? classes["input--container-contained"]
          : classes["input--container-line"]
      }
    >
      <DropDown
        btnCustomSettingth={{
          color: { dark: true },
          type: Type.text,
          roundess: Roundness.sharp,
          size: Size.XS,
        }}
        typeProperty="click"
        lable={<div>country</div>}
        styles={classes["input--container-btn"]}
      >
        <DropDown.Item>country</DropDown.Item>
      </DropDown>
      <span className={classes["input--container-separator"]}></span>
      <input
        id="input-default"
        className={classes["input--container-input"]}
        placeholder="input"
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}
