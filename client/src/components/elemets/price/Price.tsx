import { TextClassList } from "../../../types/textClassList";
import classes from "./Price.module.scss";

type PriceProps = {
  price: number;
  mainPrice: number;
  discount?: number;
  style?: string;
  classOldPrice?: TextClassList;
  classBasePrice?: TextClassList;
};

export default function Price({
  price,
  mainPrice,
  style,
  classBasePrice,
  classOldPrice,
}: PriceProps) {
  return (
    <div className={`${style} ${classes.price}`}>
      {mainPrice !== price && (
        <div
          className={` ${
            classBasePrice ? classBasePrice : TextClassList.SEMIBOLD_26
          } ${classes["price-base--price"]}`}
        >
          ${mainPrice}
        </div>
      )}
      <div
        className={
          mainPrice !== price
            ? `${classOldPrice ? classOldPrice : TextClassList.REGULAR_16} ${
                classes["price-old--price"]
              }`
            : `${classBasePrice ? classBasePrice : TextClassList.SEMIBOLD_26} ${
                classes["price-base--price"]
              }`
        }
      >
        ${price}
      </div>
    </div>
  );
}
