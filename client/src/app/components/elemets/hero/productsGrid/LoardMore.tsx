"use client";

import { ProductTypes } from "@/app/components/types/products";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import ProductsList from "../../shop/products/ProductsList";
import { log } from "console";

type LoadMorePropd = {
  initialProductsCount: number;
};

type RESPONSEdATA = {
  products: ProductTypes[];
  productCounts: number;
}

const LoardMore: FC<LoadMorePropd> = ({ initialProductsCount }) => {
  const [searchParams, setSearchParams] = useState<string>("");
  const [data, setData] = useState<ProductTypes[]>([]);
  const [productsPerPage, setProductsPerPage] =
    useState<number>(initialProductsCount);
  const limit = 8;

  const updateData = async (searchParams: string) => {
    const response = await fetch(
      `http://localhost:3030/products?${searchParams}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    if (!response.ok || response.status !== 200) {
      return;
    }
    const data = (await response.json()) as ;
    

    setData(data);
    setProductsPerPage(productsPerPage + data.products.length);
  };

  // useEffect(() => {
  //   updateData();
  // }, [searchParams]);

  const btnClickHandler: MouseEventHandler = () => {
    const urlSearchParams = new URLSearchParams({
      limit: limit.toString(),
      offset: productsPerPage.toString(),
    });
    updateData(urlSearchParams.toString());
  };
  return (
    <>
      {products && products.length ? (
        <ProductsList objectArray={products} />
      ) : (
        ""
      )}
      <button onClick={btnClickHandler}>Button</button>
    </>
  );
};

export default LoardMore;
