"use client";
import classes from "./ProductsShop.module.scss";

import { FC, MouseEventHandler, useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import { FilterContext } from "../products/FilterCtx";
import ProductList from "@/components/elemets/products-list/ProductList";
import { useFetchAllProducts } from "@/hooks/useFetchProducts";

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
  }, [searchParams]);

  const updateData = async (searchParams: URLSearchParams) => {
    const { products } = await useFetchAllProducts({
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
