"use server";
import React, { FC, ReactNode } from "react";
import classes from "./Filter.module.scss";
import FilterHeader from "./filter-header/FilterHeader";

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
