"use client";

import { TextClassList } from "@/app/components/types/textClassList";
import { MouseEventHandler, useEffect, useId, useState } from "react";
import classes from "./FilterSection.module.scss";
import NavLink from "@/app/components/navlink/NavLink";
import SliderPrice from "@/app/components/sliderllPrice/SliderllPrice";
import { useSearchParams } from "next/navigation";

interface objectArrayInterface {
  id: number;
  title: string;
}
type FilterSectionProps = {
  objectArray?: objectArrayInterface[];
  urlSearchParams: URLSearchParams;
};

export default function FilterSection({
  objectArray,
  urlSearchParams,
}: FilterSectionProps) {
  const [showBlock, setShowBlock] = useState<boolean>(true);
  const searhcParam = useSearchParams();

  const btnClickHandler: MouseEventHandler = (event) =>
    setShowBlock(!showBlock);

  return (
    <div className={classes.filter}>
      <div className={classes["filter-item"]}>
        <div
          className={`${TextClassList.SEMIBOLD_14}  ${classes["filter-item__title"]}`}
          onClick={btnClickHandler}
        >
          CATEGORY
        </div>
        {showBlock && (
          <ul className={classes["filter-item__list"]}>
            {objectArray &&
              objectArray.length > 0 &&
              objectArray.map((value, index) => (
                <li key={index}>
                  <NavLink
                    nameQueryParams="category"
                    urlSearchParams={urlSearchParams}
                    title={value.title}
                  />
                </li>
              ))}
          </ul>
        )}
      </div>
      <div className={classes["filter-item"]}>
        <div
          className={`${TextClassList.SEMIBOLD_14} ${classes["filter-item__title"]}`}
        >
          PRICE
        </div>
        <SliderPrice urlSearchparams={searhcParam} />
      </div>
    </div>
  );
}
