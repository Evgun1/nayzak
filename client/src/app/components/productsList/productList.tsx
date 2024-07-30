"use client";

import { ProductTypes } from "@/app/components/types/products";

import { FC, MouseEventHandler } from "react";
import ProductPreview from "../productPreview/ProductPreview";

import classes from "./productList.module.scss";
import "./style.scss";
import ButtonCustom from "../button-custom/ButtonCustom";

type ProductListProps = {
  productsArray: ProductTypes[];
  rating?: boolean;
  style: any;
  stylePrice?: string;
  stylePreview?: string;
  totalCount: number;
  count: number;
  btnClickHandler?: MouseEventHandler;
};

const ProductList: FC<ProductListProps> = ({
  productsArray,
  rating,
  style,
  stylePrice,
  stylePreview,
  totalCount,
  count,
  btnClickHandler,
}) => {
  return (
    <>
      <ul className={`${style} ${classes.grid}`}>
        {productsArray &&
          productsArray.length > 0 &&
          productsArray.map((product, index) => (
            <li key={index}>
              <ProductPreview
                product={product}
                rating={rating}
                style={stylePreview}
                stylePrice={stylePrice}
              />
            </li>
          ))}
      </ul>
      {totalCount > count && (
        // <button onClick={btnClickHandler}>Loard More</button>
        <ButtonCustom.SiteButton
          size={ButtonCustom.Size.M}
          type={ButtonCustom.Type.default}
          color={ButtonCustom.Color.light}
          element={{ button: btnClickHandler }}
        >
          Loard More
        </ButtonCustom.SiteButton>
      )}
    </>
  );
};

export default ProductList;
