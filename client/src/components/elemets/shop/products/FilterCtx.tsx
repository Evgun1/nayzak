"use client";
import { ProductTypes } from "@/components/types/products";
import { fetchProducts } from "@/components/utils/fetchProducts";
import { log } from "console";
import { KeyObject } from "crypto";
import { url } from "inspector";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { FC, ReactNode, createContext, useEffect, useState } from "react";

type FilterContextValue = {
  isActive: boolean;
  setIsActive: (newValue: boolean) => void;
  productsArray: ProductTypes[];
  setPoductsArray: (newValue: ProductTypes[]) => void;
  count: number;
  setCount: (newCount: number) => void;
  totalCount: number;
  setLimit: (newLimit: number) => void;
};

export const FilterContext = createContext<FilterContextValue>({
  isActive: true,
  setIsActive: (newValue) => {},
  productsArray: [],
  setPoductsArray: (newValue) => {},
  count: 0,
  setCount: (newCount) => {},
  totalCount: 0,
  setLimit: (newLimit) => {},
});

export const FilterProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [limit, setLimit] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [productsArray, setPoductsArray] = useState<ProductTypes[]>([]);
  const [count, setCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const pathName = usePathname();

  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  useEffect(() => {
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

    if (pathName === "/") {
      urlSearchParams.set("limit", "8");
    } else {
      urlSearchParams.set("limit", listTypeLimits.get(getListType) as string);
    }

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
        setLimit,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
