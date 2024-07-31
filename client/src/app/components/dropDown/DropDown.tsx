"use client";

import React, {
  ComponentPropsWithoutRef,
  FC,
  LegacyRef,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import ButtonCustom, { Size, Type } from "../button-custom/ButtonCustom";
import IconsIdList from "../icons/IconsIdList";
import classes from "./DropDown.module.scss";
import { ButtonClassList } from "../types/buttonClassList";

interface SettinghtIntrface {
  type: Type;
  size: Size;
  icon_left?: IconsIdList;
  icon_right?: IconsIdList;
  className?: string;
}

type DropDownProps = {
  btnCustomSettingth?: SettinghtIntrface;
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
          showElemets ? classes["drob-down--open"] : classes["drob-down--close"]
        }
        btnRef={btnRef}
        type={btnCustomSettingth?.type}
        size={btnCustomSettingth?.size}
        icon={{
          icon_left: btnCustomSettingth?.icon_left,
          icon_right: btnCustomSettingth?.icon_right,
        }}
        element={{ button: () => {} }}
      >
        {title}
      </ButtonCustom.SiteButton>
      {showElemets && (
        <div
          id="hidden-elements"
          ref={wrapperElementsRef}
          className={classes["drop-down--items"]}
        >
          {children}
        </div>
      )}
    </div>
  );
};

interface DropDownItemProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

const DropDownItem: FC<DropDownItemProps> = ({ children }) => {
  return <div className={classes["drop-down--items-content"]}>{children}</div>;
};

const DropDown = Object.assign(DropDownComponent, {
  Item: DropDownItem,
});

export default DropDown;
