"use client";

import React, {
  FC,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import DropDownItem from "./DropDownItem";
import ButtonCustom, {
  StyleSettingsObject,
} from "../custom-elemets/button-custom/ButtonCustom";

import classes from "./DropDown.module.scss";
import { Size, Type } from "../custom-elemets/button-custom/ButtonType";
import DropDownBtn from "./DropDownBtn";

// interface SettinghtIntrface {
//   type: Type;
//   size: Size;
//   icon?: IconsIdList;
//   color: {}
//   // className?: string;
// }

type DropDownProps = {
  btnCustomSettingth: StyleSettingsObject;
  title: string;
  children?: ReactNode;
};

const DropDownComponent: FC<DropDownProps> = ({
  title,
  btnCustomSettingth,
  children,
}) => {
  const [showElemets, setShowElements] = useState<boolean>(false);

  const btnRef = useRef() as RefObject<HTMLButtonElement>;
  const wrapperElementsRef = useRef() as RefObject<HTMLDivElement>;

  const btnClickHandler: EventListener = (event) => {
    const target = event.target as HTMLElement;
    const btnRefId = btnRef.current;
    if (!target) return;

    if (wrapperElementsRef.current) {
      const wrapperRefId = wrapperElementsRef.current.id;
      const currentWrappert = target.closest(`#${wrapperRefId}`);
      if (currentWrappert) return;
    }

    const btnCurret = target === btnRefId;

    if (btnCurret) {
      setShowElements((prev) => !prev);
    } else {
      setShowElements((prev) => (prev ? !prev : prev));
    }
  };

  useEffect(() => {
    document.addEventListener("click", btnClickHandler);
    return () => document.removeEventListener("click", btnClickHandler);
  }, []);

  return (
    <div className={classes["drop-down"]}>
      <ButtonCustom.SiteButton
        className={
          showElemets ? classes["drop-down--open"] : classes["drop-down--close"]
        }
        btnRef={btnRef}
        // styleSettings={btnCustomSettingth}

        styleSettings={btnCustomSettingth}
      >
        {title}
      </ButtonCustom.SiteButton>
      {showElemets && (
        <div
          id="hidden-elements"
          ref={wrapperElementsRef}
          className={classes["drop-down--list"]}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const DropDown = Object.assign(DropDownComponent, {
  Button: DropDownBtn,
  Item: DropDownItem,
});

export default DropDown;
