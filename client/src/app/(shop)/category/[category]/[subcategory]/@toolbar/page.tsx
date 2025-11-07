"use server";

import classes from "./ToolbarLayout.module.scss";
import { appProductsByParamsGet } from "@/lib/api/products";
import { TextClassList } from "@/types/textClassList.enum";
import { FC } from "react";
import SelectSortBy from "./components/SelectSortBy";
import SelectTypeList from "./components/SelectTypeList";

type PageProps = {
	searchParams: Record<string, any>;
	params: { category: string; subcategory: string };
};

const Page: FC<PageProps> = async (props) => {
	const urlSearchParams = new URLSearchParams(props.searchParams);

	const { productCounts } = await appProductsByParamsGet({
		searchParams: urlSearchParams,
		params: [props.params.category, props.params.subcategory],
	});

	return (
		<div className={classes["toolbar__item-list"]}>
			<div
				className={`${TextClassList.REGULAR_16} ${classes["toolbar__products-count"]}`}
			>
				{productCounts} products
			</div>
			<div className={classes["toolbar__select-list"]}>
				<SelectSortBy />
				<SelectTypeList searchParams={props.searchParams} />
			</div>
		</div>
	);
};

export default Page;
