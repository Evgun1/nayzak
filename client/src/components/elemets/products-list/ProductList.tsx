"use client";

import { Product } from "@/types/product";

import { FC, MouseEventHandler } from "react";

import classes from "./productList.module.scss";
import "./style.scss";
import ProductPreview from "../product-preview/ProductPreview";
import { ButtonCustom } from "@/lib/ui/custom-elemets/button-custom/ButtonCustom";

type ProductListProps = {
  productsArray: Product[];
  rating?: boolean;
  style: any;
  stylePrice?: string;
  stylePreview?: string;
  totalCount: number;
  count: number;
  btnClickHandler?: () => void;
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
