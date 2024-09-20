"use client";

import ProductsLoader from "./products-loader/ProductsLoader";
import Toolbar from "./Toolbar";

import classes from "./ProductsGrid.module.scss";
import { useProductsReducer } from "@/hooks/useProductsReducer";
import { useEffect } from "react";
import {
  useParams,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { appProductsGet } from "@/utils/http/products";

export default function ProductsGrid() {
  const { state, initData } = useProductsReducer();
  const params = useParams();
  const slug = params.slug as string[];

  useEffect(() => {
    initData(appProductsGet, { params: slug });
  }, [slug]);

  return (
    <div className={classes["products--grid"]}>
      <Toolbar totalCount={state.totalCount} />
      <ProductsLoader products={state.products} totalCount={state.totalCount} />
    </div>
  );
}
