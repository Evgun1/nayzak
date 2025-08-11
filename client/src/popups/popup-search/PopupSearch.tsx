"use client";

import IconsIdList from "../../components/icons/IconsIdList";
import DisplayIcon from "../../components/icons/displayIcon";
import classes from "./PopupSearch.module.scss";
import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/redux";

import ProductList from "../../components/products-list/ProductList";
import { popupActions } from "@/redux/store/popup/popup";
import { appProductsGet } from "@/lib/api/products";
import { ProductBase } from "@/types/product/productBase";

const PopupSearch = () => {
	const dispatch = useAppDispatch();
	const [productsArray, setProductsArray] = useState<ProductBase[]>([]);
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
						"search",
					)}"`,
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
	document.body.style.overflow = "visible";

	return (
		<div className={classes.search}>
			<div className={"container"}>
				<div className={classes.search__header}>
					<DisplayIcon
						className={classes["icon-logo"]}
						iconName={IconsIdList.LOGOTYPE}
					/>
					<button
						onClick={togglePopupHandler}
						className={classes["search__header-btn"]}
					></button>
				</div>
				<div className={classes.search__search}>
					<form
						className={classes.form}
						action={searchActionHandler}
					>
						<input
							name="search"
							className={classes.form__input}
							type="text"
							placeholder="Search products..."
						/>
						<button
							type="submit"
							className={classes.form__btn}
						>
							<DisplayIcon
								className={classes["icon-search"]}
								iconName={IconsIdList.SEARCH}
							/>
						</button>
					</form>
				</div>

				{/* <FilterProvider> */}

				<div className={classes.search__result}>
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
