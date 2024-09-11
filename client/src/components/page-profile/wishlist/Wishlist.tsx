"use client";

import classes from "./Wishlist.module.scss";
import useFetchProductsById from "@/hooks/useFetchProductByID";
import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";

import { removeWishlist } from "@/lib/redux/store/wishlist/action";
import WishlistItem from "./WishlistItem";
import { TextClassList } from "@/types/textClassList";

export default function Wishlist() {
  const wishlist = useAppSelector((state) => state.wishlist.productsArray);
  const dispatch = useAppDispatch();

  const products = useFetchProductsById(wishlist);

  return (
    <div className={classes.wishlist}>
      {products && products.length > 0 ? (
        products.map(({ id, description, mainPrice, title }, index) => (
          <WishlistItem
            id={id}
            description={description}
            mainPrice={mainPrice}
            title={title}
            key={index}
          />
        ))
      ) : (
        <div
          className={`${TextClassList.REGULAR_22} ${classes["wishlist--message"]}`}
        >
          The cart is empty
        </div>
      )}
    </div>
  );
}
