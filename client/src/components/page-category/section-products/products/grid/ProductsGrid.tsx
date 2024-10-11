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
import dynamic from "next/dynamic";

const DynamicProductsLoader = dynamic(
  () => import("./products-loader/ProductsLoader"),
  { loading: () => <span>Loading...</span>, ssr: false }
);

export default function ProductsGrid() {
  const { state, initData } = useProductsReducer();
  const params = useParams();
  const slug = params.slug as string[];

  useEffect(() => {
    initData(appProductsGet, { params: slug });
  }, [slug, initData]);

  return (
    <div className={classes["products--grid"]}>
      <Toolbar totalCount={state.totalCount} />

      <DynamicProductsLoader
        products={state.products}
        totalCount={state.totalCount}
      />
    </div>
  );
}
