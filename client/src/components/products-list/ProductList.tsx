"use client";

import { ProductTypes } from "@/components/types/products";

import { FC, MouseEventHandler } from "react";
import ProductPreview from "../product-preview/ProductPreview";

import classes from "./productList.module.scss";
import "./style.scss";
import ButtonCustom from "../custom-elemets/button-custom/ButtonCustom";

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
          onClick={btnClickHandler}
          styleSettings={{
            size: ButtonCustom.Size.M,
            type: ButtonCustom.Type.default,
            color: { light: true },
            roundess: ButtonCustom.Roundness.sharp,
          }}
        >
          Loard More
        </ButtonCustom.SiteButton>
      )}
    </>
  );
};

export default ProductList;
