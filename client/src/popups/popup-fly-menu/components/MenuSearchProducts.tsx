"use client";
import { FunctionComponent, useCallback, useEffect } from "react";
import classes from "./MenuSearchProducts.module.scss";
import ProductList from "@/components/products-list/ProductList";
import { useSearchContext } from "../context/useSearchContext";
import { appProductsGet } from "@/lib/api/products";
import { useLoadMoreReducer } from "@/hooks/useProductsReducer";

interface SearchProductsProps {}

const SearchProducts: FunctionComponent<SearchProductsProps> = () => {
	const { searchParams } = useSearchContext();

	const { initData, loadMore, state } = useLoadMoreReducer(appProductsGet);

	const btnHandler = useCallback(() => {
		return loadMore({
			offset: state.fullData.length,
			limit: 4,
			searchParams,
		});
	}, [state, searchParams, loadMore]);

	useEffect(() => {
		if (!searchParams) return;
		const urlSearchParams = new URLSearchParams(searchParams?.toString());
		urlSearchParams.set("limit", "4");
		initData({ searchParams: urlSearchParams });
	}, [initData, searchParams]);

	useEffect(() => {
		const element = document.getElementById("popup-menu-layout");
		if (!element) return;
		const popupMenuLayout = element as HTMLDivElement;
		popupMenuLayout.style.maxWidth = "100%";
		popupMenuLayout.style.overflow = "scroll";
	}, [state.fullData]);

	return (
		<ProductList
			style={classes["search-products"]}
			count={state.fullData.length}
			productsArray={state.fullData}
			totalCount={state.totalCount}
			btnClickHandler={btnHandler}
		/>
	);
};

export default SearchProducts;
