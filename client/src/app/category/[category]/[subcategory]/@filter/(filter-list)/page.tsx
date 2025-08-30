"use server";

import { FC } from "react";
import getIdCategoryOrSubcategory from "@/utils/getIdCategoryOrSubcategory";
import { appAttributeBySubcategoryGet } from "@/lib/api/attribute";
import FilterList, { FilterAttributesArray } from "./FilterList";
import { appMinMaxPriceGet } from "@/lib/api/products";
import filterAttributesHandler from "../../(filter-tools)/tools/filterAttributesHandler";

type PageProps = {
	params: { category: string; subcategory: string };
	searchParams: Record<string, string>;
};

const Page: FC<PageProps> = async (props) => {
	const urlSearchParams = new URLSearchParams(props.searchParams);

	const { subcategoryId, categoryId } = getIdCategoryOrSubcategory({
		params: props.params,
	});

	const { attribute } = await appAttributeBySubcategoryGet({
		param: subcategoryId as number,
		searchParams: urlSearchParams,
	});

	const filterAttributes = filterAttributesHandler(
		attribute,
		urlSearchParams,
	);

	const { minPrice, maxPrice } = await appMinMaxPriceGet(urlSearchParams, [
		categoryId as number,
		subcategoryId as number,
	]);

	console.log(props.searchParams);

	return (
		<FilterList
			price={{ maxPrice, minPrice }}
			searchParams={props.searchParams}
			attributes={filterAttributes}
		/>
	);
};

export default Page;
