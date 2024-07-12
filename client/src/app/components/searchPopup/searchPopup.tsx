"use client";

import IconsIdList from "../icons/IconsIdList";
import DisplayIcon from "../icons/displayIcon";
import classes from "./SearchPopup.module.scss";
import { ProductTypes } from "../types/products";
import {
  FormEventHandler,
  LegacyRef,
  MutableRefObject,
  createRef,
  useRef,
  useState,
} from "react";
import { fetchProducts } from "../utils/fetchProducts";
import ProductList from "../productsList/productList";

const SearchPopup = () => {
  const [data, setData] = useState<ProductTypes[]>([]);

  async function searchActioHandler(formData: FormData) {
    const search = formData.get("search");
    if (!search) return;

    const urlSearchParams = new URLSearchParams({
      search: search as string,
    });
    const { products } = await fetchProducts({
      urlSearchParams: urlSearchParams,
    });

    setData(products);
  }

  return (
    <div className={classes.wrapper}>
      <div className={"container"}>
        <div className={classes.wrapper__header}>
          <DisplayIcon
            iconName={IconsIdList.LOGOTYPE}
            width="155"
            height="30"
          />
          <button className={classes["wrapper__header-btn"]}></button>
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
                iconName={IconsIdList.SEARCH}
                width="17"
                height="17"
              />
            </button>
          </form>
        </div>
        <div className={classes.wrapper__searchResult}>
          <ProductList productsArray={data} />
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
