"use client";

import { FC, useEffect, useState } from "react";
import classes from "./ProductActions.module.scss";
import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";
import { updateCart } from "@/lib/redux/store/cart/action";
import { saveWishlist } from "@/lib/redux/store/wishlist/action";
import { TextClassList } from "@/types/textClassList";
import { popupActions } from "@/lib/redux/store/popup/popup";
import PopupError from "@/components/popup-error/PopupError";
import { ButtonCustom } from "@/lib/ui/custom-elemets/button-custom/ButtonCustom";
import { WishlistItemData } from "@/lib/redux/store/wishlist/wishlist";

type ProductActionsProps = {
  productID: number;
};

const ProductActions: FC<ProductActionsProps> = ({ productID }) => {
  const user = useAppSelector((state) => state.auth.user);
  const wishlist = useAppSelector((state) => state.wishlist.productsArray);

  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeWishlist, setActiveWishlist] = useState<boolean>(false);

  const btnClickErrorHandler = () => {
    dispatch(
      popupActions.toggle(<PopupError title="You need to log in to the site" />)
    );
  };

  const findProduct = wishlist.find((value) => value.productID === productID);
  useEffect(() => {
    setActiveWishlist(findProduct ? true : false);
  }, [findProduct]);

  const btnClickAddToCart = () => {
    dispatch(updateCart({ productID, amount: quantity }));
  };

  const btnClickAddToWishlists = () => {
    dispatch(saveWishlist({ productID }));
  };

  const btnClickPlusQuantity = () => {
    setQuantity(quantity + 1);
  };
  const btnclickMinusQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={`${classes.actions}`}>
      <div className={classes["actions--quantity"]}>
        <ButtonCustom.SiteButton
          styleSettings={{
            color: { dark: true },
            type: ButtonCustom.Type.text,
            roundess: ButtonCustom.Roundness.sharp,
            size: ButtonCustom.Size.S,
            icon: { left: ButtonCustom.IconsIdList.MINUS },
          }}
          onClick={btnclickMinusQuantity}
        />
        <span className={TextClassList.SEMIBOLD_16}>{quantity}</span>
        <ButtonCustom.SiteButton
          styleSettings={{
            color: { dark: true },
            type: ButtonCustom.Type.text,
            roundess: ButtonCustom.Roundness.sharp,
            size: ButtonCustom.Size.S,
            icon: { left: ButtonCustom.IconsIdList.ADD },
          }}
          onClick={btnClickPlusQuantity}
        />
      </div>
      <ButtonCustom.SiteButton
        onClick={user ? btnClickAddToCart : btnClickErrorHandler}
        className={classes["actions--big-btn"]}
        styleSettings={{
          color: { light: true },
          roundess: ButtonCustom.Roundness.sharp,
          size: ButtonCustom.Size.M,
          type: ButtonCustom.Type.default,
        }}
      >
        Add to Cart
      </ButtonCustom.SiteButton>
      <div className={classes["actions--btns"]}>
        <ButtonCustom.SiteButton
          styleSettings={{
            color: { dark: true },
            type: ButtonCustom.Type.text,
            size: ButtonCustom.Size.S,
            roundess: ButtonCustom.Roundness.sharp,
            icon: { left: ButtonCustom.IconsIdList.HEART },
          }}
          onClick={user ? btnClickAddToWishlists : btnClickErrorHandler}
          className={activeWishlist ? classes["actions--btn-active"] : null}
        >
          Wishlist
        </ButtonCustom.SiteButton>
        {/* <ButtonCustom.SiteButton
          styleSettings={{
            color: { dark: true },
            type: ButtonCustom.Type.text,
            size: ButtonCustom.Size.S,
            roundess: ButtonCustom.Roundness.sharp,
            icon: { left: ButtonCustom.IconsIdList.SHARE },
          }}
        >
          Share
        </ButtonCustom.SiteButton> */}
      </div>
    </div>
  );
};

export default ProductActions;
