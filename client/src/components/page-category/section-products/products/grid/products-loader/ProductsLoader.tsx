"use client";
import classes from "./ProductsLoader.module.scss";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Loader from "@/components/elemets/loader/Loader";
import ProductPreview from "@/components/elemets/product-preview/ProductPreview";
import { Product } from "@/types/product";
import { useProductsReducer } from "@/hooks/useProductsReducer";

type ProductsLoaderProps = {
  products: Product[];
  totalCount: number;
};

const ProductsLoader: FC<ProductsLoaderProps> = ({ products, totalCount }) => {
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());
  const { loadMoreProducts } = useProductsReducer();

  const getListType = searchParams.get("list_type");

  const listTypeLimits = new Map([
    ["default", "15"],
    [null, "15"],
    ["five_grid", "15"],
    ["four_grid", "12"],
    ["three_grid", "9"],
    ["two_grid", "8"],
    ["list", "8"],
  ]);

  const getLimit = listTypeLimits.get(getListType) as string;

  urlSearchParams.set("limit", getLimit);

  const btnClickHandler = () => {
    loadMoreProducts(products.length, +getLimit);
  };

  return (
    <Loader
      style={
        !classes[`${getListType}`]
          ? classes["five_grid"]
          : classes[`${getListType}`]
      }
      totalCount={totalCount}
      count={products.length}
      btnClickHandler={btnClickHandler}
    >
      {products && products.length ? (
        products.map((product, i) => (
          <li key={i}>
            <ProductPreview
              style={classes["custom-preview"]}
              product={product}
              rating
            />
          </li>
        ))
      ) : (
        <li>
          <div>No products</div>
        </li>
      )}
    </Loader>
  );
};

export default ProductsLoader;
