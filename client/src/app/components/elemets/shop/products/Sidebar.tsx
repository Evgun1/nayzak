"use client";

import { CategoriesType } from "@/app/components/types/categories";
import classes from "./Sidebar.module.scss";
import Link from "next/link";
import { TextClassList } from "@/app/components/types/textClassList";
import { SubategoriesType } from "@/app/components/types/subcategoriesClass";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { FilterContext } from "./FilterCtx";

export default function Sidebar() {
  const {isActive, setIsActive} = useContext(FilterContext)
  const btnHiddenFilter: MouseEventHandler = (event) => setIsActive(!isActive);

  return (
    <div className={`${classes.wrapper} ${isActive ? "" : 'sidebar-filter-hidden'}`} id="sidebarFilter">
      <div className={classes.wrapper__header}>
        <span>Filter</span>
        <button name="hiddenFilter" onClick={btnHiddenFilter}>close</button>
      </div>
      <div className={classes.wrapper__item}>
        <div className={classes["wrapper__item-section"]}>
          <div className={TextClassList.SEMIBOLD_14}>CATEGORIES</div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
