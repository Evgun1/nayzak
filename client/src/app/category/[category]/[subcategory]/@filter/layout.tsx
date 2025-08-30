"use server";
import React, { FC, ReactNode } from "react";
import classes from "./Filter.module.scss";
import FilterHeader from "./_filter-header/FilterHeader";
import getIdCategoryOrSubcategory from "@/utils/getIdCategoryOrSubcategory";
import { appAttributeBySubcategoryGet } from "@/lib/api/attribute";
import { FilterAttributesArray } from "./(filter-list)/FilterList";
import Loading from "./loading";

type RootLayoutProps = {
	children: ReactNode;
	params: Record<string, string>;
	searchParams: Record<string, string>;
};

const RootLayout: FC<RootLayoutProps> = async (props) => {
	return (
		<div className={classes["filter"]}>
			<FilterHeader />
			{props.children}
		</div>
	);
};

export default RootLayout;
