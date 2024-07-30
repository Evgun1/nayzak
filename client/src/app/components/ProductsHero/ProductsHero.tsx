"use client";

import classes from "./ProductsHero.module.scss";

import { FC, MouseEventHandler, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { FilterContext } from "../elemets/shop/products/FilterCtx";
import { fetchProducts } from "../utils/fetchProducts";
import ProductList from "../ProductsList/ProductList";

const ProductsHero: FC = () => {
  const searchParams = useSearchParams();
  const {
    productsArray,
    setPoductsArray,
    setCount,
    count,
    totalCount,
    setLimit,
  } = useContext(FilterContext);

  const limit = 8;

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

  useEffect(() => {
    setLimit(8);
  }, []);

  return (
    <ProductList
      productsArray={productsArray}
      style={classes["grid-hero"]}
      stylePrice={classes["custom-price"]}
      totalCount={totalCount}
      count={count}
      btnClickHandler={btnClickHandler}
    />
  );
};

export default ProductsHero;
