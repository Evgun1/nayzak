"use client";

import Image from "next/image";
import Link from "next/link";

import classes from "./actions.module.scss";

import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";

import DisplayIcon from "../elemets/icons/displayIcon";
import IconsIdList from "../elemets/icons/IconsIdList";
import { useEffect, useState } from "react";
import PopupSearch from "../popup-search/PopupSearch";
import { popupActions } from "@/lib/redux/store/popup/popup";
import PopupAuth from "../popup-auth/PopupAuth";
import { checkAuth } from "@/lib/redux/store/auth/action";
import { initCart } from "@/lib/redux/store/cart/action";
import { Token } from "@/hooks/useToken";

export default function Actions() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((selector) => selector.auth.user);

  const authHandler = () => {
    dispatch(popupActions.toggle(<PopupAuth />));
  };
  const toggleSearchHandler = () =>
    dispatch(popupActions.toggle(<PopupSearch />));

  if (userData) {
    setTimeout(() => {
      dispatch(popupActions.toggle(null));
    }, 500);
  }

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    dispatch(initCart());
  }, [Token.useGet()]);

  return (
    <div className={classes.wrapper}>
      <button
        onClick={toggleSearchHandler}
        className={classes.wrapper__button}
        type={"button"}
      >
        <DisplayIcon className={classes.icon} iconName={IconsIdList.SEARCH} />
      </button>

      <Link
        className={classes.wrapper__button}
        href={userData !== null ? "/profile" : "#"}
        onClick={userData !== null ? () => {} : authHandler}
      >
        <DisplayIcon className={classes.icon} iconName={IconsIdList.USER} />
      </Link>
      <Link className={classes["wrapper__button"]} href={"/cart"}>
        <DisplayIcon className={classes.icon} iconName={IconsIdList.CART} />
        {/* <div>amount</div> */}
      </Link>
    </div>
  );
}
