"use client";

import { TextClassList } from "@/app/components/types/textClassList";
import { MouseEventHandler, useEffect, useId, useState } from "react";
import classes from "./FilterSection.module.scss";
import NavLink from "@/app/components/navlink/NavLink";

interface objectArrayInterface {
  id: number;
  title: string;
}
type FilterSectionProps = {
  title: string;
  objectArray?: objectArrayInterface[];
  searhcParam: URLSearchParams;
};

export default function FilterSection({
  objectArray,
  title,
  searhcParam,
}: FilterSectionProps) {
  const [showBlock, setShowBlock] = useState<boolean>(true);

  const btnClickHandler: MouseEventHandler = (event) =>
    setShowBlock(!showBlock);

  return (
    <div className={classes.wrapper}>
      <div
        className={`${TextClassList.SEMIBOLD_14} ${classes.wrapper__title}`}
        onClick={btnClickHandler}
      >
        {title.toUpperCase()}
      </div>
      {showBlock && (
        <ul className={classes.wrapper__list}>
          {objectArray &&
            objectArray.length > 0 &&
            objectArray.map((value, index) => (
              <li key={index}>
                <NavLink
                  nameQueryParams="category"
                  urlSearchParams={searhcParam}
                  title={value.title}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
