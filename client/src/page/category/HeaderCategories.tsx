"use server";

import React, { FC } from "react";

import classes from "./HeaderCategories.module.scss";
import Breadcrumbs from "@/ui/breadcrumbs/Breadcrumbs";

type HeaderCategoriesProps = {
	slug: { title: string; href: string }[];
};

const HeaderCategories: FC<HeaderCategoriesProps> = async (props) => {
	return (
		<div className="container">
			<div className={classes["header-categories"]}>
				<Breadcrumbs
					item={props.slug}
					path="category"
				/>
				<h3>{props.slug.at(-1)?.title || ""}</h3>
			</div>
		</div>
	);
};

export default HeaderCategories;
