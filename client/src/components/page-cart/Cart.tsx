"use client";

import IconsIdList from "../elemets/icons/IconsIdList";
import DisplayIcon from "../elemets/icons/displayIcon";
import { ButtonClassList } from "../../types/buttonClassList";
import { TextClassList } from "../../types/textClassList";
import classes from "./Cart.module.scss";
import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import useFetchProductsById from "@/hooks/useFetchProductByID";
import CartProducts from "./CartProducts";

export default function Cart() {
  const cart = useAppSelector((select) => select.cart.productsArray);
  const products = useFetchProductsById(cart);

  useEffect(() => {}, []);

  return (
    <div className={` ${classes.container} ${classes.cart}`}>
      <h3 className={classes.cart__header}>Cart</h3>
      <div className={classes.cart__items}>
        <div className={`${classes["cart__items-header"]} ${classes.table}`}>
          <div>Product</div>
          <div>Quantity</div>
          <div>Price</div>
          <div>Subtotal</div>
        </div>
        <CartProducts products={products} />
      </div>
    </div>
  );
}
