"use server";

import { FC } from "react";

import classes from "./ProductsLayout.module.scss";
import LoaderProducts from "@/components/loader/products/LoaderProducts";

type PageProps = {
	params: { category: string; subcategory: string };
	searchParams: any;
};

const Page: FC<PageProps> = async (props) => {
	return (
		<LoaderProducts
			className={classes["products__preview"]}
			showRating
			searchParams={props.searchParams}
			params={[props.params.category, props.params.subcategory]}
		/>
	);
};

export default Page;
