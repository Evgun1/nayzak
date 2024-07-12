import { TextClassList } from "../types/textClassList";
import classes from "./Price.module.scss";

type PriceProps = {
  price: number;
  discountPercentage: number;
  classOldPrice?: TextClassList;
  classBasePrice?: TextClassList;
};

export default function Price({
  price,
  discountPercentage,
  classBasePrice,
  classOldPrice,
}: PriceProps) {
  const discount = (price - (price * discountPercentage) / 100).toFixed(2);

  const mainPrice = price.toFixed(2);
  return (
    <div className={classes.wrapper}>
      {discount !== mainPrice && (
        <span
          className={` ${
            classBasePrice ? classBasePrice : TextClassList.SEMIBOLD_26
          } ${classes.wrapper__basePrice} `}
        >
          ${discount}
        </span>
      )}
      <span
        className={
          discount !== mainPrice
            ? `${classes.wrapper__oldPrice} ${
                classOldPrice ? classOldPrice : TextClassList.REGULAR_16
              }`
            : `${classes.wrapper__basePrice} ${
                classBasePrice ? classBasePrice : TextClassList.SEMIBOLD_26
              }`
        }
      >
        ${mainPrice}
      </span>
    </div>
  );
}
