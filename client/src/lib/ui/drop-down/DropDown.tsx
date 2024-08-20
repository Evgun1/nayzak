"use client";

import React, {
  FC,
  MouseEvent,
  ReactNode,
  RefObject,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import DropDownItem from "./DropDownItem";
import ButtonCustom, {
  StyleSettingsObject,
} from "../custom-elemets/button-custom/ButtonCustom";

import classes from "./DropDown.module.scss";
import { Size, Type } from "../custom-elemets/button-custom/ButtonType";

interface TypePropertyObject {
  click: MouseEvent;
  mouseout: MouseEvent;
  mouseover: MouseEvent;
  // mouseenter: boolean;
}

type DropDownProps = {
  btnCustomSettingth: StyleSettingsObject;
  typeProperty: keyof TypePropertyObject;
  lable: ReactNode;
  children: ReactNode;
};

const DropDownComponent: FC<DropDownProps> = ({
  lable,
  btnCustomSettingth,
  typeProperty,
  children,
}) => {
  const [showElemets, setShowElements] = useState<boolean>(false);
  const btnRef = useRef() as RefObject<HTMLButtonElement>;
  const wrapperElementsRef = useRef() as RefObject<HTMLDivElement>;
  const generateId = useId();

  const btnClickHandler: EventListener = (event) => {
    const target = event.target as HTMLElement;
    const btnRefId = btnRef?.current?.id.replaceAll(":", "");
    if (!target) return;

    if (wrapperElementsRef.current) {
      const wrapperRefId = wrapperElementsRef.current.id;
      const currentWrappert = target.closest(`#${wrapperRefId}`);

      if (currentWrappert) return;
    }

    const closestBtn = target.closest(`#${btnRefId}`);
    if (closestBtn) {
      setShowElements((prev) => !prev);
    } else {
      setShowElements((prev) => (prev ? !prev : prev));
    }
  };

  useEffect(() => {
    document.addEventListener(typeProperty, btnClickHandler);
    return () => document.removeEventListener(typeProperty, btnClickHandler);
  }, []);

  return (
    <div className={classes["drop-down"]}>
      <ButtonCustom.SiteButton
        id={generateId.replaceAll(":", "")}
        className={
          showElemets ? classes["drop-down--open"] : classes["drop-down--close"]
        }
        btnRef={btnRef}
        // styleSettings={btnCustomSettingth}

        styleSettings={btnCustomSettingth}
      >
        {lable}
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
  Item: DropDownItem,
});

export default DropDown;
