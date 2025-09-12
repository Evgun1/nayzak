"use client";

import classes from "./Filter.module.scss";
import { FC, MouseEventHandler, ReactNode, useContext } from "react";
import { TextClassList } from "@/types/textClassList.enum";
import { useSearchParams } from "next/navigation";
import FilterList from "./FilterList";
import { useFilterContext } from "@/app/category/[category]/[subcategory]/(filter-tools)/context/useFilter";

type SidebarProps = {};

const Page: FC<SidebarProps> = (props) => {
	const { showFilter, setShowFilter } = useFilterContext();
	const btnHiddenFilter: MouseEventHandler = (event) => {
		setShowFilter(!showFilter);
	};

	return (
		<div
			className={`${classes.sidebar} ${
				showFilter ? "" : "sidebar-filter--hidden"
			}`}
			id="sidebarFilter"
		>
			<div className={classes.sidebar__header}>
				<span className={TextClassList.SEMIBOLD_22}>Filter</span>
				<button
					className={classes["btn-close"]}
					name="hiddenFilter"
					onClick={btnHiddenFilter}
				></button>
			</div>
			<div className={classes.sidebar__item}>
				<FilterList />
			</div>
		</div>
	);
};

export default Page;
