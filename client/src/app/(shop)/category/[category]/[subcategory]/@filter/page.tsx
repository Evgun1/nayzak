"use server";

import { appAttributeBySubcategoryGet } from "@/lib/api/attribute";
import { FC } from "react";
import filterAttributesHandler from "../tools/filterAttributesHandler";
import { appMinMaxPriceGet } from "@/lib/api/products";
import FilterList from "./components/FilterList";
import { SearchParams } from "next/dist/server/request/search-params";

type PageProps = {
	params: Promise<{ category: string; subcategory: string }>;
	searchParams: Promise<SearchParams>;
};

const Page: FC<PageProps> = async (props) => {
	const { category, subcategory } = await props.params;
	const searchParams = await props.searchParams;
	const urlSearchParams = new URLSearchParams(
		searchParams ? searchParams.toString() : "",
	);

	const { attribute } = await appAttributeBySubcategoryGet({
		param: { slug: subcategory },
		searchParams: urlSearchParams,
	});

	const filterAttributes = filterAttributesHandler(
		attribute,
		urlSearchParams,
	);

	const { minPrice, maxPrice } = await appMinMaxPriceGet(urlSearchParams, [
		category,
		subcategory,
	]);

	return (
		<FilterList
			price={{ maxPrice, minPrice }}
			searchParams={searchParams}
			attributes={filterAttributes}
		/>
	);
};

export default Page;
