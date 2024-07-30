"use client";

import IconsIdList from "@/app/components/icons/IconsIdList";
import DisplayIcon from "@/app/components/icons/displayIcon";
import { ButtonClassList } from "@/app/components/types/buttonClassList";
import { useState } from "react";
import classes from "./AddToCart.module.scss";
import ButtonCustom from "@/app/components/button-custom/ButtonCustom";

type AddToCartProps = {
  hideQuantity?: boolean;
  style?: string;
};

export default function AddToCart({ style, hideQuantity }: AddToCartProps) {
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
    <div className={` ${style} ${classes.wrapper}`}>
      {!hideQuantity && (
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
      )}
      <ButtonCustom.SiteButton
        className={classes.button}
        color={ButtonCustom.Color.light}
        roundess={ButtonCustom.Roundness.sharp}
        size={ButtonCustom.Size.M}
        type={ButtonCustom.Type.default}
        element={{ button: () => {} }}
      >
        Add to Cart
      </ButtonCustom.SiteButton>
      {/* <button className={`${classes.button} button-medium`}>Add to Cart</button> */}
      <div className={classes.links}>
        <button className={classes.links__btn}>
          <DisplayIcon
            className={classes["icon-link"]}
            iconName={IconsIdList.HEART}
          />
          <span className={ButtonClassList.BUTTON_XSMALL}>Wishlist</span>
        </button>
        <button className={classes.links__btn}>
          <DisplayIcon
            className={classes["icon-link"]}
            iconName={IconsIdList.SHARE}
          />
          <span className={ButtonClassList.BUTTON_XSMALL}>Share</span>
        </button>
      </div>
    </div>
  );
}
