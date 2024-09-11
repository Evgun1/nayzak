"use client";

import IconsIdList from "../elemets/icons/IconsIdList";
import DisplayIcon from "../elemets/icons/displayIcon";
import classes from "./PopupSearch.module.scss";
import { Product } from "../../types/product";
import { MouseEventHandler, useState } from "react";
import { FilterProvider } from "../page-shop/products/FilterCtx";
import { useSearchParams } from "next/navigation";
// import { useFetchAllProducts } from "../../hooks/useFetchProducts";
import { useAppDispatch } from "@/lib/redux/redux";

import ProductList from "../elemets/products-list/ProductList";
import { popupActions } from "@/lib/redux/store/popup/popup";
import { useFetchProductsAll } from "@/hooks/useFetchProducts";

const PopupSearch = () => {
  const dispatch = useAppDispatch();
  const [productsArray, setProductsArray] = useState<Product[]>([]);
  const [count, setCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>();
  const searchParams = useSearchParams();

  const togglePopupHandler = () => {
    dispatch(popupActions.toggle(null));
  };
  const limit = 8;

  const updateData = async (urlSearchParams: URLSearchParams) => {
    const { products, productCounts } = await useFetchProductsAll({
      urlSearchParams,
    });

    setProductsArray(productsArray.concat(products));
    setCount(count + products.length);
    setTotalCount(productCounts);
  };

  async function searchActioHandler(formData: FormData) {
    const search = formData.get("search");
    if (!search) return;

    const urlSearchParams = new URLSearchParams({
      search: search as string,
    });

    updateData(urlSearchParams);
  }

  const btnClickHandler: MouseEventHandler = () => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.append("limit", limit.toString());
    urlSearchParams.append("offset", count.toString());
    updateData(urlSearchParams);
  };

  return (
    <div className={classes.wrapper}>
      <div className={"container"}>
        <div className={classes.wrapper__header}>
          <DisplayIcon
            className={classes["icon-logo"]}
            iconName={IconsIdList.LOGOTYPE}
          />
          <button
            onClick={togglePopupHandler}
            className={classes["wrapper__header-btn"]}
          ></button>
        </div>
        <div className={classes.wrapper__search}>
          <form className={classes.form} action={searchActioHandler}>
            <input
              name="search"
              className={classes.form__input}
              type="text"
              placeholder="Search products..."
            />
            <button type="submit" className={classes.form__btn}>
              <DisplayIcon
                className={classes["icon-search"]}
                iconName={IconsIdList.SEARCH}
              />
            </button>
          </form>
        </div>

        <FilterProvider>
          <div className={classes.wrapper__searchResult}>
            <ProductList
              style={classes["grid-search"]}
              btnClickHandler={btnClickHandler}
              productsArray={productsArray}
              count={count}
              totalCount={totalCount ?? 0}
            />
          </div>
        </FilterProvider>
      </div>
    </div>
  );
};

export default PopupSearch;
