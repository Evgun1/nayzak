"use client";

import {
  FC,
  LegacyRef,
  RefObject,
  createRef,
  useEffect,
  useId,
  useState,
} from "react";
import classes from "./DropDown.module.scss";
import Link from "next/link";
import IconsIdList from "../icons/IconsIdList";
import DisplayIcon from "../icons/displayIcon";
import ButtonCustom, { Size, Type } from "../button-custom/ButtonCustom";

interface ObjectInterface {
  id?: number;
  title: string;
}

interface SettinghtIntrface {
  type: Type;
  size: Size;
  svg_left?: IconsIdList;
  svg_right?: IconsIdList;
  className?: string;
}

type DropDownProps = {
  objectArray: ObjectInterface[];
  btnCustomSettingth: SettinghtIntrface;
  titleBtn: string;
  urlQueryName: string;
  deleteUrlQueryName?: string;
  searchParams: any;
};

const DropDownT: FC<DropDownProps> = ({
  objectArray,
  btnCustomSettingth,
  titleBtn,
  urlQueryName,
  searchParams,
  deleteUrlQueryName,
}) => {
  const [showBlock, setShowBlosk] = useState(false);
  const btnRef = createRef() as LegacyRef<HTMLDivElement>;
  const urlSearchParams = new URLSearchParams(searchParams);
  const id = useId();

  const buttonClickHandler: EventListener = (event) => {
    const target = event.target as HTMLElement;
    if (!target) return;

    const dropdown = target.closest(`[id="${id}"]`);

    if (!dropdown) {
      return setShowBlosk(false);
    }

    setShowBlosk(true);
  };

  useEffect(() => {
    document.addEventListener("click", buttonClickHandler);
    return () => {
      document.removeEventListener("click", buttonClickHandler);
    };
  }, []);

  const urlParamsName = urlSearchParams.get(urlQueryName);
  const title = urlParamsName
    ? `${urlParamsName[0].toUpperCase() + urlParamsName.slice(1)}`
    : titleBtn;
  return (
    <div className={classes.dropDown} ref={btnRef} id={id}>
      {/* {ButtonCustom} */}
      <ButtonCustom.SiteButton
        type={ButtonCustom.Type.underline}
        size={ButtonCustom.Size.XL}
        element={{ button: () => {} }}
      >
        {btnCustomSettingth.svg_left && (
          <DisplayIcon iconName={btnCustomSettingth.svg_left} />
        )}
        {title}
        {btnCustomSettingth.svg_right && (
          <DisplayIcon iconName={btnCustomSettingth.svg_right} />
        )}
      </ButtonCustom.SiteButton>
      {/* <button className={classes.dropDown__btn}>{titleBtn}</button> */}
      {objectArray && objectArray.length > 0 && showBlock && (
        <ul className={classes.dropDown__item}>
          {objectArray &&
            objectArray.length > 0 &&
            objectArray.map((value, index) => (
              <li key={index}>
                <LinkItem
                  deleteUrlQueryName={deleteUrlQueryName}
                  linkName={value.title}
                  urlQueryName={urlQueryName}
                  urlSearchParams={urlSearchParams}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownT;

type LinkItemProps = {
  linkName: string;
  urlQueryName: string;
  deleteUrlQueryName?: string;
  urlSearchParams: URLSearchParams;
};
const LinkItem: FC<LinkItemProps> = ({
  linkName,
  urlQueryName,
  deleteUrlQueryName,
  urlSearchParams,
}) => {
  urlSearchParams.set(urlQueryName, linkName.toLowerCase());
  const href = `?${urlSearchParams}`;
  if (deleteUrlQueryName) {
    urlSearchParams.delete(deleteUrlQueryName);
  }

  return (
    <Link className={classes.link} scroll={false} href={href}>
      {linkName}
    </Link>
  );
};
