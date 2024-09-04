"use client";

import classes from "./ProductsHero.module.scss";

import { FC, MouseEventHandler, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { FilterContext } from "../../page-shop/products/FilterCtx";
// import { useFetchAllProducts } from "../../../hooks/useFetchProducts";
import ProductList from "@/components/elemets/products-list/ProductList";
import { Products } from "@/hooks/useFetchProducts";

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
    const { products } = await Products.useFetchAll({
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
