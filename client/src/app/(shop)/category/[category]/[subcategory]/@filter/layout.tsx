"use server";
import { FC, ReactNode } from "react";
import classes from "./FilterLayout.module.scss";
import FilterHeader from "./components/FilterHeader";
import { SearchParams } from "next/dist/server/request/search-params";

type RootLayoutProps = {
	children: ReactNode;
	// params: Promise<Record<string, string>>;
	// searchParams: Promise<SearchParams>;
};
const FilterLayout: FC<RootLayoutProps> = async (props) => {
	return (
		<div className={classes["filter"]}>
			<FilterHeader />
			{props.children}
		</div>
	);
};

export default FilterLayout;
