"use client";

import IconsIdList from "../elements/icons/IconsIdList";
import DisplayIcon from "../elements/icons/displayIcon";
import classes from "./PopupSearch.module.scss";
import { ProductItem } from "../../types/product.types";
import { useState } from "react";

import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/redux";

import ProductList from "../elements/products-list/ProductList";
import { popupActions } from "@/lib/redux/store/popup/popup";
import { appProductsGet } from "@/utils/http/products";
import { FilterProvider } from "../page-category/section-products/products/filter/FilterCtx";
import Form from "../elements/form-component/FormComponent";

const PopupSearch = () => {
    const dispatch = useAppDispatch();
    const [productsArray, setProductsArray] = useState<ProductItem[]>([]);
    const [message, setMessage] = useState<string>();
    const [count, setCount] = useState<number>(0);
    const [totalCount, setTotalCount] = useState<number>();
    const searchParams = useSearchParams();

    const togglePopupHandler = () => {
        dispatch(popupActions.toggle(null));
    };
    const limit = 8;

    const updateData = async (urlSearchParams: URLSearchParams) => {
        const { products, productCounts } = await appProductsGet({
            searchParams: urlSearchParams,
        });

        !productCounts || products.length === 0
            ? setMessage(
                  `Product not found with this value: "${urlSearchParams.get(
                      "search"
                  )}"`
              )
            : setMessage(undefined);

        setProductsArray(products);
        setCount(count + products.length);
        setTotalCount(productCounts);
    };

    async function searchActionHandler(formData: FormData) {
        const search = formData.get("search");
        if (!search) return;

        const urlSearchParams = new URLSearchParams({
            search: search as string,
        });

        updateData(urlSearchParams);
    }

    const btnClickHandler = () => {
        const urlSearchParams = new URLSearchParams();
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
                    <form className={classes.form} action={searchActionHandler}>
                        <input
                            name='search'
                            className={classes.form__input}
                            type='text'
                            placeholder='Search products...'
                        />
                        <button type='submit' className={classes.form__btn}>
                            <DisplayIcon
                                className={classes["icon-search"]}
                                iconName={IconsIdList.SEARCH}
                            />
                        </button>
                    </form>
                </div>

                {/* <FilterProvider> */}

                <div className={classes.wrapper__searchResult}>
                    {!message ? (
                        <ProductList
                            style={classes["grid-search"]}
                            btnClickHandler={btnClickHandler}
                            productsArray={productsArray}
                            count={count}
                            totalCount={totalCount ?? 0}
                        />
                    ) : (
                        <>{message}</>
                    )}
                </div>
                {/* </FilterProvider> */}
            </div>
        </div>
    );
};

export default PopupSearch;
