"use client";

import IconsIdList from "@/app/components/icons/IconsIdList";
import DisplayIcon from "@/app/components/icons/displayIcon";

import classes from "./AddToCart.module.scss";
import { ButtonClassList } from "@/app/components/types/buttonClassList";
import { SiteButton } from "@/app/components/button/Button";
import { useState } from "react";

export default function AddToCart() {
  const [quantity, setQuantity] = useState(1);

  const btnPlusQuantity = () => {
    setQuantity(quantity + 1);
  };
  const btnMinusQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.quantity}>
        <button
          onClick={btnMinusQuantity}
          className={classes.quantity__btn}
        ></button>
        <span className={classes.quantity__value}>{quantity}</span>
        <button
          onClick={btnPlusQuantity}
          className={classes.quantity__btn}
        ></button>
      </div>

      <SiteButton
        color={{ dark: true }}
        size={{ xlarge: true }}
        type={{ text: true }}
      >
        <DisplayIcon iconName={IconsIdList.ARROW} />
        Get started
      </SiteButton>
      {/* <button className={classes.button}>Add to Cart</button> */}
      <div className={classes.links}>
        <button className={classes.links__btn}>
          <DisplayIcon iconName={IconsIdList.HEART} height="20" width="20" />
          <span className={ButtonClassList.BUTTON_XSMALL}>Wishlist</span>
        </button>
        <button className={classes.links__btn}>
          <DisplayIcon iconName={IconsIdList.SHARE} height="20" width="20" />
          <span className={ButtonClassList.BUTTON_XSMALL}>Share</span>
        </button>
      </div>
    </div>
  );
}
