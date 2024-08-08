"use client";

import Image from "next/image";
import Link from "next/link";

import classes from "./actions.module.scss";

import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { toggle } from "@/lib/store/popup/popup";
import DisplayIcon from "../../icons/displayIcon";
import IconsIdList from "../../icons/IconsIdList";
import { useState } from "react";
import SearchPopup from "../../search-popup/SearchPopup";

export default function Actions() {
  const dispatch = useAppDispatch();
  const toggleSearchHandler = () => dispatch(toggle(<SearchPopup />));

  return (
    <div className={classes.wrapper}>
      <button
        onClick={toggleSearchHandler}
        className={classes.wrapper__button}
        type={"button"}
      >
        <DisplayIcon className={classes.icon} iconName={IconsIdList.SEARCH} />
      </button>

      <Link className={classes.wrapper__button} href={"/profile"}>
        <DisplayIcon className={classes.icon} iconName={IconsIdList.USER} />
      </Link>
      <Link className={classes["wrapper__button"]} href={"/cart"}>
        <DisplayIcon className={classes.icon} iconName={IconsIdList.CART} />
        {/* <div>amount</div> */}
      </Link>
    </div>
  );
}
