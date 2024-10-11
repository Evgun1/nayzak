"use client";

import classes from "./ProductsHero.module.scss";

import { FC, useEffect } from "react";

import Loader from "@/components/elemets/loader/Loader";
import ProductPreview from "@/components/elemets/product-preview/ProductPreview";
import { useProductsReducer } from "@/hooks/useProductsReducer";
import { appProductsGet } from "@/utils/http/products";
import { useSearchParams } from "next/navigation";

const ProductsHero = () => {
  const searchParams = useSearchParams();

  const { state, loadMoreProducts, initData } = useProductsReducer();

  const btnClickHandler = () => {
    loadMoreProducts(state.products.length);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.set("limit", "8");
    initData(appProductsGet, { searchParams: urlSearchParams });
  }, [searchParams, initData]);

  return (
    <Loader
      style={classes["grid-hero"]}
      count={state.products.length}
      totalCount={state.totalCount}
      btnClickHandler={btnClickHandler}
    >
      {state.products && state.products.length > 0 ? (
        state.products.map((product, i) => (
          <li key={i} className={classes["grid-li"]}>
            <ProductPreview product={product} />
          </li>
        ))
      ) : (
        <div>No product</div>
      )}
    </Loader>
  );
};

export default ProductsHero;
