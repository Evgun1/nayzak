"use client";

import IconsIdList from "@/components/elemets/icons/IconsIdList";
import DisplayIcon from "@/components/elemets/icons/displayIcon";
import { ButtonClassList } from "@/types/buttonClassList";
import { FC, useState } from "react";
import classes from "./AddToCart.module.scss";
import ButtonCustom from "@/lib/ui/custom-elemets/button-custom/ButtonCustom";
import { useAppDispatch } from "@/lib/retux/redux";
import { popupActions } from "@/lib/retux/store/popup/popup";
import { cartActions, CartItemData } from "@/lib/store/cart/cart.redux";
import { updateCart } from "@/lib/retux/store/cart/action";
import { useAppSelector } from "@/hooks/redux";

type AddToCartProps = {
  style?: string;
  productID: number;
};

const AddToCart: FC<AddToCartProps> = ({ style, productID }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const productsCart = useAppSelector(
    (selector) => selector.cart.productsArray
  );

  console.log(productsCart);

  const addToCart = () => {
    dispatch(
      updateCart({
        cart: productsCart,
        curentProduct: { productID, amount: quantity },
      })
    );
  };

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
      <ButtonCustom.SiteButton
        onClick={addToCart}
        className={classes.button}
        styleSettings={{
          color: { light: true },
          roundess: ButtonCustom.Roundness.sharp,
          size: ButtonCustom.Size.M,
          type: ButtonCustom.Type.default,
        }}
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
};

export default AddToCart;
