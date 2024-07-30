import IconsIdList from "../../icons/IconsIdList";
import DisplayIcon from "../../icons/displayIcon";
import { ButtonClassList } from "../../types/buttonClassList";
import { TextClassList } from "../../types/textClassList";
import classes from "./Cart.module.scss";

export default function Cart() {
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

        <div className={`${classes.item} ${classes.table}`}>
          <div className={classes.item__header}>
            <img
              className={classes["item__header-img"]}
              src="https://placehold.co/652x889"
              alt=""
            />
            <div className={classes["item__header-title"]}>
              <span className={TextClassList.SEMIBOLD_14}>
                Luxury Kanzo Shoes
              </span>
              <span className={TextClassList.REGULAR_12}>
                Size: 2XL, Color: Green
              </span>
              <button
                className={`${classes["btn"]} ${ButtonClassList.BUTTON_XSMALL}`}
              >
                <DisplayIcon
                  className={classes.icon}
                  iconName={IconsIdList.TRASH}
                />
                <span>Remove</span>
              </button>
            </div>
          </div>
          <div>quantity</div>
          <span>$24.00</span>
          <span>$24.00</span>
        </div>
      </div>
      <div></div>
    </div>
  );
}
