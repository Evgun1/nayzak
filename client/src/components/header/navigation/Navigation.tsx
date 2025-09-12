"use server";

import React, { FC } from "react";

import classes from "./Navigation.module.scss";
import { appCategoriesGet } from "@/lib/api/categories";
import { appSubcategoriesGet } from "@/lib/api/subcategories";
import { appProductsGet } from "@/lib/api/products";
import NavigationAction from "./NavigationAction";
interface NavigationItem {
	label: string;
	url: string;
	active?: boolean;
	children?: NavigationItem[];
}

type AppNavigation = NavigationItem[];

interface BuildNavDataItem {
	id: number;
	title: string;
}
type BuildNavParam = {
	data: BuildNavDataItem;
	url: string;
	active?: boolean;
};

const Navigation: FC = async () => {
	const navigation: AppNavigation = [];

	const buildNav = (param: BuildNavParam): NavigationItem => ({
		label: param.data.title,
		active: param.active,
		url: param.url.toLowerCase(),
	});

	const categories = await appCategoriesGet();

	for await (const category of categories) {
		const navItem: NavigationItem = buildNav({
			data: category,
			url: `${category.title}-c${category.id}`,
		});
		const urlSearchParams = new URLSearchParams({
			categoryId: category.id.toString(),
		});
		const urlSearchParamsSubcategories = new URLSearchParams({
			categoryId: category.id.toString(),
		});
		const subcategories = await appSubcategoriesGet(
			urlSearchParamsSubcategories,
		);

		const subCategoriesForDisplay = [];

		for (const subcategory of subcategories) {
			urlSearchParams.set("subcategory", subcategory.id.toString());

			const { productCounts } = await appProductsGet({
				searchParams: urlSearchParams,
			});

			subCategoriesForDisplay.push({
				active: productCounts > 0,
				data: subcategory,
				url: `${subcategory.title}-s${subcategory.id}`,
			});
		}

		if (subCategoriesForDisplay && subCategoriesForDisplay.length) {
			navItem.children = subCategoriesForDisplay.map(buildNav);
		}

		navigation.push(navItem);
	}

	if (!navigation || navigation.length === 0) {
		return "";
	}

	return (
		<nav className={classes["header-navigation"]}>
			<NavigationAction navigationData={navigation} />
		</nav>
	);
};

export default Navigation;
