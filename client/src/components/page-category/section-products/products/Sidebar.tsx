"use client";

import classes from "./Sidebar.module.scss";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { FilterContext } from "./FilterCtx";
import FilterSection from "./FilterSection";
import { TextClassList } from "@/types/textClassList";
import { PageProps } from "../../../../../.next/types/app/layout";

type SidebarProps = {
  props: PageProps;
};

export default function Sidebar({ props }: SidebarProps) {
  const searchParams = new URLSearchParams(props.searchParams);

  const { isActive, setIsActive } = useContext(FilterContext);
  const btnHiddenFilter: MouseEventHandler = (event) => setIsActive(!isActive);

  const [categories, setCategories] = useState();
  useEffect(() => {
    fetch("http://localhost:3030/categories", { cache: "no-cache" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setCategories(data.categories);
      });
  }, []);

  return (
    <div
      className={`${classes.wrapper} ${
        isActive ? "" : "sidebar-filter-hidden"
      }`}
      id="sidebarFilter"
    >
      <div className={classes.wrapper__header}>
        <span className={TextClassList.SEMIBOLD_22}>Filter</span>
        <button
          className={classes["btn-close"]}
          name="hiddenFilter"
          onClick={btnHiddenFilter}
        ></button>
      </div>
      <div className={classes.wrapper__item}>
        <FilterSection searParams={searchParams} objectArray={categories} />
      </div>
    </div>
  );
}
