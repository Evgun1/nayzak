import { capitalizeAndSeparateWords } from "./capitalizeAndSeparateWords";

type GetIdCategoryOrSubcategoryParams = {
	searchParams?: URLSearchParams;
	params?: { category?: string; subcategory?: string };
};

function t() {}

function getIdCategoryOrSubcategory(params: GetIdCategoryOrSubcategoryParams) {
	const urlSearchParams = new URLSearchParams(params.searchParams);
	const result = {} as { categoryId?: number; subcategoryId?: number };

	const getCategoryId = (category: string) => {
		const arr = category.split("-");
		for (const element of arr) {
			if (!element.includes("c")) continue;
			const id = +element.replaceAll("c", "");

			if (Number.isNaN(id)) continue;
			result.categoryId = id;
		}
	};
	const getSubcategoryId = (subcategory: string) => {
		const arr = subcategory.split("-");
		for (const element of arr) {
			if (!element.includes("s")) continue;
			const id = +element.replaceAll("s", "");
			if (Number.isNaN(id)) continue;
			result.subcategoryId = id;
		}
	};

	if (params.searchParams) {
		if (urlSearchParams.has("category")) {
			const query = urlSearchParams.get("category") as string;
			getCategoryId(query);
		}
		if (urlSearchParams.has("subcategory")) {
			const query = urlSearchParams.get("subcategory") as string;
			getSubcategoryId(query);
		}
	}

	// for (const key in props.params) {
	// 	const obj = {} as { id: number; title: string; href: string };
	// 	for (const element of (props.params[key] as string).split("-")) {
	// 		if (!Number.isNaN(+element.slice(1))) {
	// 			obj.id = +element.slice(1);
	// 		} else {
	// 			obj.title = capitalizeAndSeparateWords(element);
	// 			// console.log(element);
	// 		}

	// 		obj.href = props.params[key];
	// 	}
	// 	// slug.push(obj);
	// }

	if (params.params) {
		if (params.params.category) {
			getCategoryId(params.params.category);
		}
		if (params.params.subcategory) {
			getSubcategoryId(params.params.subcategory);
		}
	}

	return result;
}
export default getIdCategoryOrSubcategory;
