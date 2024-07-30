"use client";
import classes from "./ProductsShop.module.scss";

import { FC, MouseEventHandler, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { FilterContext } from "../elemets/shop/products/FilterCtx";
import { fetchProducts } from "../utils/fetchProducts";
import ProductList from "../ProductsList/ProductList";
import { ReviewsType } from "../types/reviews";

const ProductsShop: FC = () => {
  const [style, setStyle] = useState<any>();
  const searchParams = useSearchParams();
  const { productsArray, setPoductsArray, setCount, count, totalCount } =
    useContext(FilterContext);

  const limit = 12;

  useEffect(() => {
    const classListType = searchParams.get("list_type");
    classListType
      ? setStyle(classes[classListType])
      : setStyle(classes["five_grid"]);
    updateData(searchParams);
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
    <ProductList
      rating
      productsArray={productsArray}
      style={style}
      stylePreview={classes["custom-preview"]}
      totalCount={totalCount}
      count={count}
      btnClickHandler={btnClickHandler}
    />
  );
};

export default ProductsShop;
