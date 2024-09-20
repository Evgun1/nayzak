"use client";

import classes from "./ProductsHero.module.scss";

import { FC } from "react";

import Loader from "@/components/elemets/loader/Loader";
import ProductPreview from "@/components/elemets/product-preview/ProductPreview";
import { useProductsReducer } from "@/hooks/useProductsReducer";

const ProductsHero: FC<{ searchParams: URLSearchParams }> = () => {
  const { state, loadMoreProducts } = useProductsReducer();

  const btnClickHandler = () => {
    loadMoreProducts(state.products.length);
  };

  return (
    <Loader
      style={classes["grid-hero"]}
      count={state.products.length}
      totalCount={state.totalCount}
      btnClickHandler={btnClickHandler}
    >
      {state.isLoading ? <>Load</> : ""}

      {state.products ? (
        state.products.map((product, i) => (
          <li key={i}>
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
