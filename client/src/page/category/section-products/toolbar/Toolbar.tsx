"use server";
import { TextClassList } from "@/types/textClassList.enum";
import classes from "./Toolbar.module.scss";
import FilterButtons from "./filter-buttons/FilterButtons";
import SelectSortBy from "./select-sort-by/SelectSortBy";
import SelectTypeList from "./select-type-list/SelectTypeList";
import { FC } from "react";

const Toolbar: FC<{ productsCount: number }> = (params) => {
	return (
		<div className={classes["toolbar"]}>
			<div className={classes["toolbar__item-list"]}>
				<div
					className={`${TextClassList.REGULAR_16} ${classes["toolbar__products-count"]}`}
				>
					{params.productsCount} products
				</div>
				<div className={classes["toolbar__select-list"]}>
					<SelectSortBy />
					<SelectTypeList />
				</div>
			</div>
			<FilterButtons />
		</div>
	);
};

export default Toolbar;
