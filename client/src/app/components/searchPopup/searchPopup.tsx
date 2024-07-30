"use client";

import IconsIdList from "../icons/IconsIdList";
import DisplayIcon from "../icons/displayIcon";
import classes from "./SearchPopup.module.scss";
import { ProductTypes } from "../types/products";
import { MouseEventHandler, useState } from "react";
import ProductList from "../ProductsList/ProductList";
import { FilterProvider } from "../elemets/shop/products/FilterCtx";
import { useSearchParams } from "next/navigation";
import { fetchProducts } from "../utils/fetchProducts";
import { useAppDispatch } from "@/lib/redux";
import { toggle } from "@/lib/store/popup/popup";

const SearchPopup = () => {
  const dispatch = useAppDispatch();
  const [productsArray, setProductsArray] = useState<ProductTypes[]>([]);
  const [count, setCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>();
  const searchParams = useSearchParams();

  const togglePopupHandler = () => {
    dispatch(toggle(null));
  };
  const limit = 8;

  const updateData = async (urlSearchParams: URLSearchParams) => {
    const { products, productCounts } = await fetchProducts({
      urlSearchParams,
    });

    setProductsArray(productsArray.concat(products));
    setCount(count + products.length);
    setTotalCount(productCounts);
  };

  async function searchActioHandler(formData: FormData) {
    const search = formData.get("search");
    if (!search) return;

    console.log(search);

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

export default SearchPopup;
