"use server";

import { FC } from "react";

import classes from "./style.module.scss";
import getIdCategoryOrSubcategory from "@/utils/getIdCategoryOrSubcategory";
import LoaderProducts from "@/components/loader/products/LoaderProducts";

type PageProps = {
	params: { category: string; subcategory: string };
	searchParams: any;
};

const Page: FC<PageProps> = async (props) => {
	const { categoryId, subcategoryId } = getIdCategoryOrSubcategory({
		params: props.params,
	});
	if (!categoryId || !subcategoryId) return;

	return (
		<LoaderProducts
			className={classes["products__preview"]}
			showRating
			searchParams={props.searchParams}
			params={[categoryId, subcategoryId]}
		/>
	);
};

export default Page;
