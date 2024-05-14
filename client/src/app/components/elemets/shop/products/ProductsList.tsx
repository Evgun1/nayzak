import { ProductTypes } from "@/app/components/types/products";

import classes from "./ProductsList.module.scss";
import Link from "next/link";
import { ButtonClassList } from "@/app/components/types/buttonClassList";
import { TextClassList } from "@/app/components/types/textClassList";
import "./style.scss";

type ProductListProps = {
  objectArray: ProductTypes[];
  urlSearchParams: URLSearchParams;
};

export default async function ProductsList({
  objectArray,
  urlSearchParams,
}: ProductListProps) {
  const classListType = urlSearchParams.get("list_type");

  return (
    <ul
      id="test"
      className={` ${classListType ? classListType : "five_grid"} ${
        classes.list
      }`}
    >
      {objectArray &&
        objectArray.length > 0 &&
        objectArray.map((value) => (
          <li key={value.id}>
            <div
              className={`${classes["product"]} ${
                classListType ? classListType + "-item" : "five_grid-item"
              }`}
            >
              <img
                className={classes["product__img"]}
                src="https://placehold.co/400"
                alt=""
              />

              <div className={classes["product__link"]}>
                <div>rating</div>
                <div className={ButtonClassList.BUTTON_SMALL}>
                  {value.title}
                </div>
                <div>
                  <div className={TextClassList.SEMIBOLD_14}>
                    {value.price}$
                  </div>
                </div>
              </div>
              {/* </Link> */}
            </div>
          </li>
        ))}
    </ul>
  );
}
