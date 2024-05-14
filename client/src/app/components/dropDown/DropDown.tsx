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

interface ObjectInterface {
  id?: number;
  title: string;
}

type DropDownProps = {
  objectArray: ObjectInterface[];
  titleBtn: string;
  urlQueryName: string;
  deleteUrlQueryName?: string;
  searchParams: any;
};

const DropDown: FC<DropDownProps> = ({
  objectArray,
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
    if (!target || !btnRef) return;

    console.log(target);
    // const { current } = btnRef as RefObject<HTMLDivElement>;
    // if (!current) return;

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

  return (
    <div className={classes.dropDown} ref={btnRef} id={id}>
      <button className={classes.dropDown__btn}>{titleBtn}</button>
      {objectArray && objectArray.length > 0 && showBlock && (
        <ul className={classes.dropDown__item}>
          {objectArray &&
            objectArray.length > 0 &&
            objectArray.map((value, index) => (
              <li key={index}>
                <LinkItem
                  deleteUrlQueryName={deleteUrlQueryName}
                  index={value.id ? value.id : 0}
                  linkTitle={value.title}
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

export default DropDown;

type LinkItemProps = {
  index: number;
  linkTitle: string;
  urlQueryName: string;
  deleteUrlQueryName?: string;
  urlSearchParams: URLSearchParams;
};
const LinkItem: FC<LinkItemProps> = ({
  index,
  linkTitle,
  urlQueryName,
  deleteUrlQueryName,
  urlSearchParams,
}) => {
  urlSearchParams.set(urlQueryName, linkTitle.toLowerCase());
  const href = `?${urlSearchParams}`;
  if (deleteUrlQueryName) {
    urlSearchParams.delete(deleteUrlQueryName);
  }

  return (
    <Link className={classes.link} scroll={false} href={href}>
      {linkTitle}
    </Link>
  );
};
