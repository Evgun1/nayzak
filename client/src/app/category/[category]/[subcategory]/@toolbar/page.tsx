"use server";
import classes from "./Toolbar.module.scss";
import { FC } from "react";
import { TextClassList } from "@/types/textClassList.enum";
import { appProductsByParamsGet } from "@/lib/api/products";
import FilterChips from "./filter-chips/FilterChips";
import SelectSortBy from "./select-sort-by/SelectSortBy";
import SelectTypeList from "./select-type-list/SelectTypeList";

type PageProps = {
	searchParams: Record<string, string>;
	params: { category: string; subcategory: string };
};
const Page: FC<PageProps> = async (props) => {
	const urlSearchParams = new URLSearchParams(props.searchParams);

	const { productCounts } = await appProductsByParamsGet({
		searchParams: urlSearchParams,
		params: [props.params.category, props.params.subcategory],
	});

	return (
		<div className={classes["toolbar"]}>
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
			<FilterChips searchParams={urlSearchParams} />
		</div>
	);
};

export default Page;
