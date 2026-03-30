import { appCategoriesGet } from "@/lib/api/categories";
import { appProductsGet } from "@/lib/api/products";
import { appSubcategoriesGet } from "@/lib/api/subcategories";
import { NextResponse } from "next/server";

interface BuildNavDataItem {
	id: number;
	title: string;
}
type BuildNavParam = {
	data: BuildNavDataItem;
	url: string;
	active?: boolean;
};
export interface NavigationItem {
	label: string;
	url: string;
	active?: boolean;
	children?: NavigationItem[];
}

export async function GET() {
	// const navigation: NavigationItem[] = [];

	const buildNav = (param: BuildNavParam): NavigationItem => ({
		label: param.data.title,
		active: param.active,
		url: param.url.toLowerCase(),
	});
	const categories = await appCategoriesGet();

	const navigation = await Promise.all(
		categories.map(async (category) => {
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
			return navItem;
		}),
	);
	return  NextResponse.json(navigation);


	// for await (const category of categories) {
	// 	const navItem: NavigationItem = buildNav({
	// 		data: category,
	// 		url: `${category.title}-c${category.id}`,
	// 	});
	// 	const urlSearchParams = new URLSearchParams({
	// 		categoryId: category.id.toString(),
	// 	});
	// 	const urlSearchParamsSubcategories = new URLSearchParams({
	// 		categoryId: category.id.toString(),
	// 	});
	// 	const subcategories = await appSubcategoriesGet(
	// 		urlSearchParamsSubcategories,
	// 	);

	// 	const subCategoriesForDisplay = [];

	// 	for (const subcategory of subcategories) {
	// 		urlSearchParams.set("subcategory", subcategory.id.toString());

	// 		const { productCounts } = await appProductsGet({
	// 			searchParams: urlSearchParams,
	// 		});

	// 		subCategoriesForDisplay.push({
	// 			active: productCounts > 0,
	// 			data: subcategory,
	// 			url: `${subcategory.title}-s${subcategory.id}`,
	// 		});
	// 	}

	// 	if (subCategoriesForDisplay && subCategoriesForDisplay.length) {
	// 		navItem.children = subCategoriesForDisplay.map(buildNav);
	// 	}

	// 	navigation.push(navItem);
	// }
}
