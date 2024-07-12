"use client";

import { ProductTypes } from "@/app/components/types/products";

import { FC, MouseEventHandler, useContext, useEffect, useState } from "react";
import ProductPreview from "../productPreview/ProductPreview";
import { useSearchParams } from "next/navigation";

import classes from "./productList.module.scss";
import "./style.scss";
import { FilterContext } from "../elemets/shop/products/FilterCtx";
import { fetchProducts } from "../utils/fetchProducts";

interface PageData {
  home?: boolean;
  shop?: boolean;
}

type ProductListProps = {
  page?: PageData;
};

const ProductList: FC<ProductListProps> = ({ page }) => {
  const [style, setStyle] = useState<any>();
  const searchParams = useSearchParams();
  const { productsArray, setPoductsArray, setCount, count, totalCount } =
    useContext(FilterContext);

  const limit = 12;

  useEffect(() => {
    // if (page.home) {
    //   useState(classes.grid__home);
    // }
    if (page?.shop) {
      const classListType = searchParams.get("list_type");
      classListType ? setStyle(classListType) : setStyle("five_grid");
    }
  }, [searchParams]);

  const updateData = async (searchParams: URLSearchParams) => {
    const { products } = await fetchProducts({
      urlSearchParams: searchParams,
    });

    setPoductsArray(productsArray.concat(products));
    setCount(count + products.length);
  };

  const btnClickHandler: MouseEventHandler = () => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.append("limit", limit.toString());
    urlSearchParams.append("offset", count.toString());
    updateData(urlSearchParams);
  };

  return (
    <>
      <ul className={`${style} ${classes.grid}`}>
        {productsArray &&
          productsArray.length > 0 &&
          productsArray.map((product, index) => (
            <li key={index}>
              <ProductPreview product={product} />
            </li>
          ))}
      </ul>
      {totalCount > count && (
        <button onClick={btnClickHandler}>Loard More</button>
      )}
    </>
  );
};

export default ProductList;

// enum ButtonPropSize {
//   LARGE = "btn-size-large",
// }

// type ButtonProps = {
//   color: string;
//   shape: string;
//   size: ButtonPropSize;
//   buttonLabel: string;
// };

// const Button: FC<ButtonProps> = ({ color, shape, size, buttonLabel }) => {
//   return <a href="#" className={`${color} ${shape} ${size}`}></a>;
// };
