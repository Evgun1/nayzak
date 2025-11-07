"use server";

import { appAttributeBySubcategoryGet } from "@/lib/api/attribute";
import { FC } from "react";
import filterAttributesHandler from "../tools/filterAttributesHandler";
import { appMinMaxPriceGet } from "@/lib/api/products";
import FilterList from "./components/FilterList";

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
