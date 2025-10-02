"use server";

import { FC } from "react";
import { appAttributeBySubcategoryGet } from "@/lib/api/attribute";
import FilterList, { FilterAttributesState } from "./filter-list/FilterList";
import { appMinMaxPriceGet } from "@/lib/api/products";
import filterAttributesHandler from "../(filter-tools)/tools/filterAttributesHandler";

type PageProps = {
	params: { category: string; subcategory: string };
	searchParams: Record<string, string>;
};

const Page: FC<PageProps> = async (props) => {
	const urlSearchParams = new URLSearchParams(props.searchParams);

	const { attribute } = await appAttributeBySubcategoryGet({
		param: { slug: props.params.subcategory },
		searchParams: urlSearchParams,
	});

	const filterAttributes = filterAttributesHandler(
		attribute,
		urlSearchParams,
	);

	const { minPrice, maxPrice } = await appMinMaxPriceGet(urlSearchParams, [
		props.params.category,
		props.params.subcategory,
	]);

	return (
		<FilterList
			price={{ maxPrice, minPrice }}
			searchParams={props.searchParams}
			attributes={filterAttributes}
		/>
	);
};

export default Page;
