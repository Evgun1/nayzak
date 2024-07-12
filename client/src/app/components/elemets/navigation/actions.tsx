"use client";

import Image from "next/image";
import Link from "next/link";

import classes from "./actions.module.scss";

import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { toggle } from "@/lib/store/popup/popup";
import DisplayIcon from "../../icons/displayIcon";
import IconsIdList from "../../icons/IconsIdList";
import { useState } from "react";
import SearchPopup from "../../searchPopup/searchPopup";

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
        <DisplayIcon iconName={IconsIdList.SEARCH} />
      </button>

      <Link className={classes.wrapper__button} href={"/profile"}>
        <DisplayIcon iconName={IconsIdList.USER} />
      </Link>
      <Link className={classes["wrapper__button"]} href={"/cart"}>
        <DisplayIcon iconName={IconsIdList.CART} />
        {/* <div>amount</div> */}
      </Link>
    </div>
  );
}
