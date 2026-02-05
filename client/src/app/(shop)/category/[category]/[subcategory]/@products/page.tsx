"use server";

import { FC } from "react";

import classes from "./ProductsLayout.module.scss";
import LoaderProducts from "@/components/loader/products/LoaderProducts";
import Loading from "./loading";
import { SearchParams } from "next/dist/server/request/search-params";

type PageProps = {
	params: Promise<{ category: string; subcategory: string }>;
	searchParams: Promise<SearchParams>;
};

const Page: FC<PageProps> = async (props) => {
	const searchParams = await props.searchParams;
	const { category, subcategory } = await props.params;
	return (
		<>
			<LoaderProducts
				className={classes["products"]}
				showRating
				searchParams={searchParams}
				params={[category, subcategory]}
			/>
		</>
	);
};

export default Page;
