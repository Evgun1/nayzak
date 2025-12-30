"use client";

import { ButtonClassList } from "@/types/buttonClassList.enum";
import classes from "./ProductGridHeader.module.scss";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { CategoryItem } from "@/types/categories.types";
import { ISubcategory } from "@/types/subcategories.interface";
import { useSearchParams } from "next/navigation";
import { appCategoriesGet } from "@/lib/api/categories";
import { appSubcategoriesGet } from "@/lib/api/subcategories";
import { appProductsGet } from "@/lib/api/products";
import { Select, SelectItem } from "@/ui/select/Select";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import HeaderNavButton from "./HeaderNavButton";
import { log } from "console";
import { popupActions } from "@/redux/store/popup/popup";
import PopupLoading from "@/popups/popup-loading/PopupLoading";

const ProductGridHeader: FC = () => {
	const dispatch = useAppDispatch();
	const responsive = useAppSelector((state) => state.responsive);
	const searchParams = useSearchParams();

	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState<CategoryItem[]>([]);
	const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
	const [categoryLabel, setCategoryLabel] = useState<string>("Categories");
	const [subcategoryLabel, setSubcategoryLabel] =
		useState<string>("Subcategories");

	const responsiveMemo = useMemo(() => responsive, [responsive]);

	const searchParamsCallback = useCallback(
		(name: string) => {
			const urlSearchParams = new URLSearchParams(
				searchParams.toString(),
			);

			return {
				result: urlSearchParams.get(name)?.split("-"),
				urlSearchParams,
			};
		},
		[searchParams],
	);

	const categoryIdMemo = useMemo(() => {
		const { result, urlSearchParams } = searchParamsCallback("category");
		if (!result || result.length <= 0) return undefined;

		for (const element of result) {
			if (!element.includes("c")) continue;
			if (!Number.isNaN(+element.replaceAll("c", ""))) {
				urlSearchParams.set("categoryId", element.replaceAll("c", ""));
				urlSearchParams.delete("category");
			}
		}
		return { ["categoryId"]: urlSearchParams.get("categoryId") } as {
			categoryId: string;
		};
	}, [searchParamsCallback]);
	const subcategoryIdMemo = useMemo(() => {
		const { result, urlSearchParams } = searchParamsCallback("subcategory");
		if (!result || result.length <= 0) return undefined;
		for (const element of result) {
			if (!element.includes("s")) continue;
			if (!Number.isNaN(+element.replaceAll("s", ""))) {
				urlSearchParams.set(
					"subcategoryId",
					element.replaceAll("s", ""),
				);
				urlSearchParams.delete("subcategory");
			}
		}
		return { ["subcategoryId"]: urlSearchParams.get("subcategoryId") } as {
			subcategoryId: string;
		};
	}, [searchParamsCallback]);

	const fetchHandler = useCallback(async () => {
		const urlSearchParams = new URLSearchParams({
			...categoryIdMemo,
			...subcategoryIdMemo,
		});

		const [categoriesFetch, subcategoriesFetch] = await Promise.all([
			appCategoriesGet(),
			appSubcategoriesGet(urlSearchParams),
		]);

		const { productCounts } = await appProductsGet({
			searchParams: urlSearchParams,
		});

		if (!Number.isNaN(productCounts) && productCounts > 0) {
		}

		return {
			categories: categoriesFetch,
			subcategories: subcategoriesFetch,
		};
	}, [categoryIdMemo, subcategoryIdMemo]);

	useEffect(() => {
		(async () => {
			const { categories, subcategories } = await fetchHandler();

			const categoryData = [];
			const subcategoryData = [];
			for (const category of categories) {
				const urlSearchParamsCat = new URLSearchParams([
					["categoryId", category.id.toString()],
				]);
				const { productCounts } = await appProductsGet({
					searchParams: urlSearchParamsCat,
				});
				if (productCounts <= 0) continue;
				categoryData.push(category);

				for (const subcategory of subcategories) {
					urlSearchParamsCat.set(
						"subcategoryId",
						subcategory.id.toString(),
					);

					const { productCounts } = await appProductsGet({
						searchParams: urlSearchParamsCat,
					});
					if (productCounts <= 0) continue;

					subcategoryData.push(subcategory);
				}
			}

			if (categoryIdMemo?.categoryId) {
				const categoryId = parseInt(categoryIdMemo.categoryId);
				for (const element of categoryData) {
					if (element.id !== categoryId) continue;

					const indexOf = categoryData.findIndex(
						(cat) => cat.id === element.id,
					);
					categoryData.splice(indexOf, 1);
					setCategoryLabel(element.title);
				}
			} else {
				setCategoryLabel("Categories");
			}
			if (subcategoryIdMemo?.subcategoryId) {
				const subcategoryId = parseInt(subcategoryIdMemo.subcategoryId);
				for (const element of subcategoryData) {
					if (element.id !== subcategoryId) continue;

					const indexOf = subcategoryData.findIndex(
						(cat) => cat.id === element.id,
					);
					subcategoryData.splice(indexOf, 1);
					setSubcategoryLabel(element.title);
				}
			} else {
				setSubcategoryLabel("Subcategories");
			}

			setCategories(categoryData);
			setSubcategories(subcategoryData);
		})();
	}, [fetchHandler, categoryIdMemo, subcategoryIdMemo]);

	useEffect(() => {
		if (isLoading) {
			dispatch(popupActions.toggle(<>test</>));
		} else {
			dispatch(popupActions.toggle(null));
		}
	}, [dispatch, isLoading]);

	return (
		<div className={classes["product-grid-header"]}>
			<div
				className={`${
					responsiveMemo.isDesktop || responsiveMemo.isTablet
						? ButtonClassList.BUTTON_X_LARGE
						: ButtonClassList.BUTTON_SMALL
				}`}
			>
				You’re browsing
			</div>
			<HeaderNavButton
				deleteQueryParams="subcategory"
				label={categoryLabel}
				dataArray={categories}
				queryParamsKey="category"
				searchParams={searchParams}
			/>
			<div
				className={
					responsiveMemo.isDesktop || responsiveMemo.isTablet
						? ButtonClassList.BUTTON_X_LARGE
						: ButtonClassList.BUTTON_SMALL
				}
			>
				In
			</div>
			<HeaderNavButton
				label={subcategoryLabel}
				dataArray={subcategories}
				queryParamsKey="subcategory"
				searchParams={searchParams}
			/>
		</div>
	);
};

export default ProductGridHeader;
