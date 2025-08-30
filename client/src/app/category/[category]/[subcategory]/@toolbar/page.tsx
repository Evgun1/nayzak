"use server";
import getIdCategoryOrSubcategory from "@/utils/getIdCategoryOrSubcategory";
import classes from "./Toolbar.module.scss";
import { FC } from "react";
import { TextClassList } from "@/types/textClassList.enum";
import { appProductsByParamsGet } from "@/lib/api/products";
import FilterButtons from "./filter-chips/FilterChips";
import {
	appAttributeBySubcategoryGet,
	appAttributesAllGet,
} from "@/lib/api/attribute";
import filterAttributesHandler from "../(filter-tools)/tools/filterAttributesHandler";
import SelectSortBy from "./select-sort-by/SelectSortBy";
import SelectTypeList from "./select-type-list/SelectTypeList";

type PageProps = {
	searchParams: Record<string, string>;
	params: Record<string, string>;
};
const Page: FC<PageProps> = async (props) => {
	const urlSearchParams = new URLSearchParams(props.searchParams);

	console.log(urlSearchParams.delete("color", "287"));

	const { categoryId, subcategoryId } = getIdCategoryOrSubcategory({
		searchParams: urlSearchParams,
		params: props.params,
	});

	const { productCounts } = await appProductsByParamsGet({
		searchParams: urlSearchParams,
		params: [
			(categoryId as number).toString(),
			(subcategoryId as number).toString(),
		],
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

			{urlSearchParams.toString()
				? (async () => {
						const attributes = await appAttributesAllGet({
							searchParams: urlSearchParams,
						});

						const filterAttributes = filterAttributesHandler(
							attributes,
							urlSearchParams,
						);

						return (
							<FilterButtons
								attributes={filterAttributes}
								searchParams={urlSearchParams}
							/>
						);
				  })()
				: ""}
		</div>
	);
};

export default Page;
