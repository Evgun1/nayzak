"use server";

import classes from "./ToolbarLayout.module.scss";
import { appProductsByParamsGet } from "@/lib/api/products";
import { TextClassList } from "@/types/textClassList.enum";
import { FC } from "react";
import SelectSortBy from "./components/SelectSortBy";
import SelectTypeList from "./components/SelectTypeList";
import { SearchParams } from "next/dist/server/request/search-params";
// import dynamic from "next/dynamic";
// import SelectTypeListSkeleton from "./skeleton/SelectTypeListSkeleton";

type PageProps = {
	searchParams: Promise<SearchParams>;
	params: Promise<{ category: string; subcategory: string }>;
};

// const SelectTypeListDynamic = dynamic(
// 	() => import("./components/SelectTypeList"),
// 	{ ssr: false, loading: () => <SelectTypeListSkeleton /> },
// );

const Page: FC<PageProps> = async (props) => {
	const searchParams = await props.searchParams;
	const { category, subcategory } = await props.params;

	const urlSearchParams = new URLSearchParams(searchParams.toString());

	const { productCounts } = await appProductsByParamsGet({
		searchParams: urlSearchParams,
		params: [category, subcategory],
	});

	return (
		<div className={classes["toolbar__item-list"]}>
			<div
				className={`${TextClassList.REGULAR_16} ${classes["toolbar__products-count"]}`}
			>
				{productCounts} products
			</div>
			<SelectSortBy />
			<SelectTypeList searchParams={searchParams} />
		</div>
	);
};

export default Page;
