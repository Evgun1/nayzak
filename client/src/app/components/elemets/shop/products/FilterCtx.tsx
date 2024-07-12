"use client";
import { ProductTypes } from "@/app/components/types/products";
import { fetchProducts } from "@/app/components/utils/fetchProducts";
import { KeyObject } from "crypto";
import { useParams, useSearchParams } from "next/navigation";
import { FC, ReactNode, createContext, useEffect, useState } from "react";

type FilterContextValue = {
  isActive: boolean;
  setIsActive: (newValue: boolean) => void;
  productsArray: ProductTypes[];
  setPoductsArray: (newValue: ProductTypes[]) => void;
  count: number;
  setCount: (newCount: number) => void;
  totalCount: number;
};

export const FilterContext = createContext<FilterContextValue>({
  isActive: true,
  setIsActive: (newValue) => {},
  productsArray: [],
  setPoductsArray: (newValue) => {},
  count: 0,
  setCount: (newCount) => {},
  totalCount: 0,
});

export const FilterProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [productsArray, setPoductsArray] = useState<ProductTypes[]>([]);
  const [count, setCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());

    const limits = new Map([
      [null, "15"],
      ["default", "15"],
      ["five_grid", "15"],
      ["four_grid", "12"],
      ["three_grid", "9"],
      ["two_grid", "8"],
      ["list", "8"],
    ]);

    if (urlSearchParams.has("list_type")) {
      const listType = urlSearchParams.get("list_type");
    }

    urlSearchParams.set("limit", "15");

    fetchProducts({ urlSearchParams }).then(({ productCounts, products }) => {
      setCount(products.length);
      setPoductsArray(products);
      setTotalCount(productCounts);
    });
  }, [searchParams]);

  return (
    <FilterContext.Provider
      value={{
        isActive,
        setIsActive,
        productsArray,
        setPoductsArray,
        count,
        setCount,
        totalCount,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
