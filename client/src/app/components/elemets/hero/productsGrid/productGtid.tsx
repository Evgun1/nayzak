import { PageProps } from "../../../../../../.next/types/app/layout";
import { FC, useState } from "react";
import Link from "next/link";

import { CategoriesType } from "@/app/components/types/categories";
import { ButtonClassList } from "@/app/components/types/buttonClassList";
import { ProductTypes } from "@/app/components/types/products";
import ProductList from "../../../productsList/productList";
import DropDown from "@/app/components/dropDown/DropDown";
import classes from "./productGrid.module.scss";
import LoardMore from "./LoardMore";
import { fetchProducts } from "@/app/utils/fetchProducts";

export default async function ProductGrid(props: PageProps) {
  const urlSearchParams = new URLSearchParams(props.searchParams);

  const categoriesData = await fetchCategories();
  const subcategoriesData = await fetchSubcategories({ urlSearchParams });
  const productsData = await fetchProducts({ urlSearchParams });

  const urlCategoryName = urlSearchParams.get("category");
  const urlSubategoryName = urlSearchParams.get("subcategory");

  return (
    <div className={`container ${classes.wrapper}`}>
      <div className={classes.wrapper__title}>
        <div className={ButtonClassList.BUTTON_XLARGE}>You’re browsing</div>
        <DropDown
          objectArray={categoriesData}
          titleBtn={
            urlCategoryName
              ? `${urlCategoryName[0].toUpperCase() + urlCategoryName.slice(1)}`
              : "Category"
          }
          deleteUrlQueryName="subcategory"
          urlQueryName="category"
          searchParams={props.searchParams}
        />
        <div className={ButtonClassList.BUTTON_XLARGE}>In</div>
        <DropDown
          objectArray={subcategoriesData}
          titleBtn={
            urlSubategoryName
              ? `${
                  urlSubategoryName[0].toUpperCase() +
                  urlSubategoryName.slice(1)
                }`
              : "Subcategory"
          }
          urlQueryName="subcategory"
          searchParams={props.searchParams}
        />
      </div>
      <ProductList objactArray={productsData} />
      {/* <LoardMore initialProductsCount={productsData.length} /> */}
    </div>
  );
}

const fetchCategories = async () => {
  const res = await fetch("http://localhost:3030/categories", {
    cache: "no-cache",
  });
  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText);
  }
  const result: CategoriesType[] = await res.json().then((data) => {
    return data.categories;
  });
  return result;
};

type fetchSubcategoriesProps = {
  urlSearchParams: URLSearchParams;
};
const fetchSubcategories = async ({
  urlSearchParams,
}: fetchSubcategoriesProps) => {
  const res = await fetch(
    `http://localhost:3030/subcategories?${urlSearchParams}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText);
  }

  const result = await res.json().then((data) => {
    return data.subcategories;
  });
  return result;
};
