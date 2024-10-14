"use clinet";

import {
  ChangeEventHandler,
  FC,
  HTMLInputTypeAttribute,
  RefObject,
  useEffect,
  useRef,
} from "react";
import DisplayIcon from "../icons/displayIcon";
import IconsIdList from "../icons/IconsIdList";
import classes from "./InputDefault.module.scss";
import { ButtonClassList } from "@/types/buttonClassList";
import { ErrorProps } from "next/error";
import { InputType } from "./InputType";
import { TextClassList } from "@/types/textClassList";

interface ButtonItem {
  icon?: IconsIdList;
  text?: string;
  onClick?: () => void;
  type: "reset" | "submit" | "button";
}

interface ButtonObject {
  left?: ButtonItem;
  right?: ButtonItem;
}

interface InputDefaultProps extends InputType {
  style: "line" | "contained";
  buttonSettings?: ButtonObject;
  label?: string;
}
const InputDefault: FC<InputDefaultProps> = ({
  style,
  buttonSettings,
  inputSettings,
  label,
  error,
}) => {
  const inputContainerRef = useRef(null) as RefObject<HTMLDivElement>;

  // console.log(error);

  const handleFocus = () => {
    if (!inputContainerRef.current) return;
    inputContainerRef.current.classList.add(classes["input--focus"]);
  };

  const handleBlur = () => {
    if (!inputContainerRef.current) return;
    inputContainerRef.current.classList.remove(classes["input--focus"]);
  };

  useEffect(() => {
    console.log(error);

    if (error !== undefined) {
      inputContainerRef.current?.classList.add(classes["input--error"]);
    } else {
      inputContainerRef.current?.classList.remove(classes["input--error"]);
    }
  }, [error]);

  return (
    <div className={classes["input--container"]}>
      {label ? (
        <span className={TextClassList.SEMIBOLD_16}>{label}</span>
      ) : (
        <></>
      )}
      <div
        ref={inputContainerRef}
        id="input-container"
        className={
          style === "contained"
            ? classes["input--container-contained"]
            : classes["input--container-line"]
        }
      >
        {buttonSettings?.left ? (
          <button
            type={buttonSettings?.left?.type}
            className={classes["input--container-btn"]}
            onClick={buttonSettings.left.onClick}
          >
            {buttonSettings.left.icon ? (
              <DisplayIcon
                className={classes["input--btn-icon"]}
                iconName={buttonSettings.left.icon}
              />
            ) : (
              <span className={ButtonClassList.BUTTON_SMALL}>
                {buttonSettings.left.text}
              </span>
            )}
          </button>
        ) : (
          <></>
        )}
        <input
          id={inputSettings?.id}
          name={inputSettings?.name}
          className={classes["input--container-input"]}
          placeholder={inputSettings?.placeholder}
          type={inputSettings?.type}
          value={inputSettings?.value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={inputSettings?.required}
          autoComplete={inputSettings.autoComplete}
        />
        {buttonSettings?.right ? (
          <button
            type={buttonSettings?.right?.type}
            className={classes["input--container-btn"]}
            onClick={buttonSettings.right.onClick}
          >
            {buttonSettings.right.icon ? (
              <DisplayIcon
                className={classes["input--btn-icon"]}
                iconName={buttonSettings.right.icon}
              />
            ) : (
              <span className={ButtonClassList.BUTTON_SMALL}>
                {buttonSettings.right.text}
              </span>
            )}
          </button>
        ) : (
          <></>
        )}
      </div>
      {error ? (
        <span className={TextClassList.REGULAR_12}>{error}</span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InputDefault;
