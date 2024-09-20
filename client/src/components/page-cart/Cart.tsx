"use client";

import { ButtonClassList } from "../../types/buttonClassList";
import { TextClassList } from "../../types/textClassList";
import classes from "./Cart.module.scss";
import useFetchProductsById from "@/hooks/useFetchProductByID";
import { useAppSelector } from "@/lib/redux/redux";
import CartItem from "./CartItem";

export default function Cart() {
  const cart = useAppSelector((select) => select.cart.productsArray);

  const products = useFetchProductsById(cart);

  return (
    <div className={`${classes.container} ${classes.cart}`}>
      <h3 className={classes[`cart--title`]}>Cart</h3>
      {products && products.length > 0 ? (
        <div className={classes["cart--content"]}>
          <div
            className={`${classes["cart--content-header"]} ${classes["cart--table"]}`}
          >
            <div className={ButtonClassList.BUTTON_SMALL}>Product</div>
            <div className={ButtonClassList.BUTTON_SMALL}>Quantity</div>
            <div className={ButtonClassList.BUTTON_SMALL}>Price</div>
            <div className={ButtonClassList.BUTTON_SMALL}>Subtotal</div>
          </div>
          {products.map((product, index) => (
            <div
              key={index}
              className={`${classes["cart--content-product"]} ${classes["cart--table"]}`}
            >
              <CartItem
                productID={product.id}
                amount={product.amount}
                description={product.description}
                mainPrice={product.mainPrice}
                title={product.title}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`${TextClassList.REGULAR_22} ${classes["cart--message"]}`}
        >
          The cart is empty
        </div>
      )}
    </div>
  );
}
