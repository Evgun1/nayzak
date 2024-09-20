"use client";

import classes from "./actions.module.scss";

import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";

import { useEffect } from "react";
import PopupSearch from "../popup-search/PopupSearch";
import { popupActions } from "@/lib/redux/store/popup/popup";
import PopupAuth from "../popup-auth/PopupAuth";
import { checkAuth } from "@/lib/redux/store/auth/action";
import { initCart } from "@/lib/redux/store/cart/action";
import { LinkCustom } from "@/lib/ui/custom-elemets/link-custom/LinkCustom";
import { initWishlist } from "@/lib/redux/store/wishlist/action";
import PopupError from "../popup-error/PopupError";
import { useCookiGet } from "@/hooks/useCookie";
import { ButtonCustom } from "@/lib/ui/custom-elemets/button-custom/ButtonCustom";
import { appCookiGet } from "@/utils/http/cookie";

export default function Actions() {
  const dispatch = useAppDispatch();
  const cartAmount = useAppSelector((selector) => selector.cart.totalAmount);
  const userData = useAppSelector((selector) => selector.auth.user);

  const token = appCookiGet("user-token");

  const btnAuthHandler = () => {
    dispatch(popupActions.toggle(<PopupAuth />));
  };
  const btnSearchHandler = () => dispatch(popupActions.toggle(<PopupSearch />));
  const btnClickCart = () => {
    dispatch(
      popupActions.toggle(<PopupError title="You need to log in to the site" />)
    );
  };

  if (userData) {
    setTimeout(() => {
      dispatch(popupActions.toggle(null));
    }, 500);
  }

  useEffect(() => {
    dispatch(initWishlist());
    dispatch(checkAuth());
    dispatch(initCart());
  }, [dispatch, token]);

  return (
    <div className={classes.actions}>
      <ButtonCustom.SiteButton
        styleSettings={{
          type: ButtonCustom.Type.text,
          color: { dark: true },
          roundess: ButtonCustom.Roundness.sharp,
          size: ButtonCustom.Size.L,
          icon: { left: ButtonCustom.IconsIdList.SEARCH },
        }}
        className={classes["actions--btn"]}
        onClick={btnSearchHandler}
      />

      <LinkCustom.SiteLink
        href={{ endpoint: userData !== null ? "/profile" : "#" }}
        onClick={userData !== null ? () => {} : btnAuthHandler}
        styleSettings={{
          color: { dark: true },
          icon: { left: LinkCustom.IconsIdList.USER },
          type: LinkCustom.Type.text,
          size: LinkCustom.Size.L,
        }}
        className={classes["actions--btn"]}
      />

      <LinkCustom.SiteLink
        href={{ endpoint: !userData ? "#" : "/cart" }}
        styleSettings={{
          color: { dark: true },
          icon: { left: LinkCustom.IconsIdList.CART },
          type: LinkCustom.Type.text,
          size: LinkCustom.Size.L,
        }}
        className={classes["actions--btn"]}
      >
        {cartAmount !== 0 && (
          <span className={classes["actions--btn-amount"]}>{cartAmount}</span>
        )}
      </LinkCustom.SiteLink>
    </div>
  );
}
