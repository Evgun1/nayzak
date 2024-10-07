"use client";

import IconsIdList from "@/components/elemets/icons/IconsIdList";
import {
  FC,
  HTMLInputTypeAttribute,
  RefObject,
  useEffect,
  useRef,
} from "react";

import "./InputCustom.scss";

import { Style, Type } from "./InputType";
import { ButtonClassList } from "@/types/buttonClassList";

interface StyleSettingsObject {
  style: Style;
  typeStyle: Type;
  className?: string;
}

interface ButtonObject {
  left?: {
    icon?: IconsIdList;
    text?: string;
    clickHandler: () => void;
  };
  right?: {
    icon?: IconsIdList;
    text?: string;
    clickHandler: () => void;
  };
}

type InputCustomProps = {
  id?: string;
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  styleSettings: StyleSettingsObject;
  button?: ButtonObject;
};

const Form = ({
  name,
  id,
  placeholder,
  styleSettings: { className, style, typeStyle },
  button,
  type,
  value,
}: InputCustomProps) => {
  const refInput = useRef() as RefObject<HTMLInputElement>;

  const hanlder: EventListener = (event) => {
    event;
    const target = event.target as HTMLElement;
    const refInputCurnet = refInput.current;
    if (!target || !refInputCurnet) return;

    if (event.type === "keyup") {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key !== "Tab") return;
    }

    if (target.id === refInputCurnet.id) {
      document.getElementById("input-container")?.classList.add("input--focus");
    } else {
      document
        .getElementById("input-container")
        ?.classList.remove("input--focus");
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", hanlder);
    document.addEventListener("click", hanlder);
    return () => {
      document.removeEventListener("keyup", hanlder);
      document.removeEventListener("click", hanlder);
    };
  }, []);

  const styles: any[] = [style, typeStyle];

  return (
    <form action="">
      {/* {typeStyle !== "input-type--text-area" ? (
        <div
          className={`input--container ${styles.join(" ")}`}
          id="input-container"
        >
          {button?.left ? (
            <button className={"input--btn"}>
              {button.left.icon ? (
                <DisplayIcon
                  className={"input--btn-icon"}
                  iconName={button.left.icon}
                />
              ) : (
                <span className={ButtonClassList.BUTTON_SMALL}>
                  {button.left.text}
                </span>
              )}
            </button>
          ) : (
            ""
          )}
          <input
            id="input"
            ref={refInput}
            // className={"input--container-input"}
            // className={`${className ?? ""} ${classes.join(" ")}`}
            type={type}
            placeholder={"input"}
            name={name}
            value={value}
          />

          {button?.right ? (
            <button className={"input--btn"}>
              {button.right.icon ? (
                <DisplayIcon
                  className={"input--btn-icon"}
                  iconName={button.right.icon}
                />
              ) : (
                <span className={ButtonClassList.BUTTON_SMALL}>
                  {button.right.text}
                </span>
              )}
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        <textarea
          className={styles.join(" ")}
          placeholder={"input"}
          name={name}
          value={value}
          id={id}
        ></textarea>
      )} */}
    </form>
  );
};

export const InputCustom = {
  Form,
  Style,
  Type,
  IconsIdList,
};
