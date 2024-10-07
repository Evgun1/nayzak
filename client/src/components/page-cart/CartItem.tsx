"use client";

import { TextClassList } from "@/types/textClassList";
import classes from "./Cart.module.scss";
import { ButtonCustom } from "@/lib/ui/custom-elemets/button-custom/ButtonCustom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/redux/redux";
import { changeAmount, removeCart } from "@/lib/redux/store/cart/action";
import Image from "next/image";

type CartItemProps = {
  title: string;
  description: string;
  amount?: number;
  mainPrice: number;
  productID: number;
};

export default function CartItem({
  title,
  description,
  amount,
  mainPrice,
  productID,
}: CartItemProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(amount ?? 1);

  const btnPlusQuantity = () => {
    setQuantity(quantity + 1);
  };
  const btnMinusQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  const btnRemoveProductCart = () => {
    dispatch(removeCart(productID));
  };

  useEffect(() => {
    dispatch(changeAmount({ amount: quantity, productID }));
  }, [quantity]);

 

  return (
    <>
      <div className={classes["cart--product"]}>
        <Image
         unoptimized
         width={0}
         height={0}
         layout="responsive"
          className={classes["cart--product-img"]}
          src="https://placehold.co/652x889"
          alt=""
        />
        <div className={classes["cart--product-info"]}>
          <span
            className={`${classes["cart--info-title"]} ${TextClassList.SEMIBOLD_14}`}
          >
            {title}
          </span>
          <span
            className={`${classes["cart--info-text"]} ${TextClassList.REGULAR_12}`}
          >
            {description}
          </span>
          <ButtonCustom.SiteButton
            styleSettings={{
              color: { dark: true },
              roundess: ButtonCustom.Roundness.sharp,
              type: ButtonCustom.Type.text,
              size: ButtonCustom.Size.XS,
              icon: { left: ButtonCustom.IconsIdList.TRASH },
            }}
            onClick={btnRemoveProductCart}
          >
            Remove
          </ButtonCustom.SiteButton>
        </div>
      </div>
      <div className={classes["cart--product-amount"]}>
        <ButtonCustom.SiteButton
          styleSettings={{
            color: { dark: true },
            roundess: ButtonCustom.Roundness.sharp,
            size: ButtonCustom.Size.XS,
            type: ButtonCustom.Type.text,
            icon: { left: ButtonCustom.IconsIdList.MINUS },
          }}
          onClick={btnMinusQuantity}
          className={classes["cart--amount-btn"]}
        />
        <div className={TextClassList.SEMIBOLD_12}>{quantity}</div>
        <ButtonCustom.SiteButton
          styleSettings={{
            color: { dark: true },
            roundess: ButtonCustom.Roundness.sharp,
            size: ButtonCustom.Size.XS,
            type: ButtonCustom.Type.text,
            icon: { left: ButtonCustom.IconsIdList.ADD },
          }}
          onClick={btnPlusQuantity}
          className={classes["cart--amount-btn"]}
        />
      </div>
      <span className={TextClassList.REGULAR_18}>${mainPrice}</span>
      <span className={TextClassList.SEMIBOLD_18}>
        ${mainPrice * (amount as number)}
      </span>
    </>
  );
}
