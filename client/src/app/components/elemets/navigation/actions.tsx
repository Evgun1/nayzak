"use client";

import Image from "next/image";
import Link from "next/link";

import classes from "./actions.module.scss";

import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { toggle } from "@/lib/store/popup/popup";
import SearchPopup from "../../searchPopup/searchPopup";
import DisplayIcon from "../../icons/displayIcon";
import IconsIdList from "../../icons/IconsIdList";

type ActionProps = {
  amount?: number;
};

export default function Actions({ amount }: ActionProps) {
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
        {amount && <div>{amount}</div>}
        {/* <div>2</div> */}
      </Link>
    </div>
  );
}
