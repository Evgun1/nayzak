"use client";

import { useEffect, useState } from "react";
import { Product } from "../types/product";
// import { CartItemData } from "@/lib/store/cart/cart.redux";
import { useSearchParams } from "next/navigation";
import { CartItemData } from "@/lib/redux/store/cart/cart";
import { useFetchProductsAll } from "./useFetchProducts";

type ProductsArrayData = {
  id?: number;
  amount?: number;
  productID: number;
};

const useFetchProductsById = (
  productsArray: ProductsArrayData[],
  returnAmount = true
) => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProduct = async () => {
    if (!productsArray || !productsArray.length) {
      setProducts([]);
      return;
    }
    const productsID: number[] = productsArray.map(
      (element) => element.productID
    );

    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.set(`id`, `${productsID}`);
    const products = (await useFetchProductsAll({ urlSearchParams })).products;

    if (!returnAmount) {
      setProducts(products);
      return;
    }

    const output: Product[] = products.map((item) => {
      const index = productsArray.findIndex(
        (element) => element.productID === item.id
      );

      const newItem = { ...item };

      if (index !== -1) {
        newItem.amount = productsArray[index].amount;
      }

      return newItem;
    });

    setProducts(output);
  };

  useEffect(() => {
    fetchProduct();
  }, [productsArray]);

  return products;
};

export default useFetchProductsById;
