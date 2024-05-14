import { ButtonClassList } from "@/app/components/types/buttonClassList";
import { ProductTypes } from "@/app/components/types/products";
import { TextClassList } from "@/app/components/types/textClassList";
import Link from "next/link";

import classes from "./productList.module.scss";
import { FC } from "react";

interface objactArrayType {
  id: number;
  title: string;
  price: number;
}

type ProductListProps = {
  objactArray: objactArrayType[];
};

const ProductList: FC<ProductListProps> = async ({ objactArray }) => {
  return (
    <ul className={classes.wrapper__products}>
      {objactArray &&
        objactArray.length > 0 &&
        objactArray.map((value) => (
          <li className={classes["wrapper__products-list"]} key={value.id}>
            <Link href={`/product/${value.id}`}>
              <div className={classes["wrapper__products-title"]}>
                <div className={ButtonClassList.BUTTON_SMALL}>
                  {value.title}
                </div>
                <div>
                  <div className={TextClassList.SEMIBOLD_14}>
                    {value.price}$
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default ProductList;

enum ButtonPropSize {
  LARGE = "btn-size-large",
}

type ButtonProps = {
  color: string;
  shape: string;
  size: ButtonPropSize;
  buttonLabel: string;
};

const Button: FC<ButtonProps> = ({ color, shape, size, buttonLabel }) => {
  return <a href="#" className={`${color} ${shape} ${size}`}></a>;
};
