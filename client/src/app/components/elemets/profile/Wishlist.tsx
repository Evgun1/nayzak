import IconsIdList from "../../icons/IconsIdList";
import DisplayIcon from "../../icons/displayIcon";
import { ButtonClassList } from "../../types/buttonClassList";
import { TextClassList } from "../../types/textClassList";
import classes from "./Wishlist.module.scss";

export default function Wishlist() {
  return (
    <div className={classes.wishlist}>
      <div className={classes.wishlist__header}>
        <img
          className={classes["wishlist__header-img"]}
          src="https://placehold.co/652x889"
          alt=""
        />
        <div className={classes["header__title"]}>
          <span className={TextClassList.SEMIBOLD_18}>Luxury Kanzo Shoes</span>
          <span className={TextClassList.REGULAR_14}>
            Size: 2XL, Color: Green
          </span>
          <button
            className={` ${classes["header__title-btn"]} ${ButtonClassList.BUTTON_XSMALL}`}
          >
            <DisplayIcon iconName={IconsIdList.TRASH} width="18" height="18" />
            <span>Remove</span>
          </button>
        </div>
      </div>
      <span>$24.00</span>
      <button className={classes.wishlist__btn}>Select options</button>
    </div>
  );
}
