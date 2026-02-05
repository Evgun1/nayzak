"use server";

import classes from "./ProductGrid.module.scss";

import ProductGridHeader from "./components/ProductGridHeader";
import dynamic from "next/dynamic";
import LoaderProducts from "@/components/loader/products/LoaderProducts";
import { FC } from "react";
import { SearchParams } from "next/dist/server/request/search-params";

// const ProductGridHeaderDynamic = dynamic(
// 	() => import("./components/ProductGridHeader"),
// 	{ ssr: false },
// );

type ProductGridProps = {
	searchParams: Promise<SearchParams>;
};
const Page: FC<ProductGridProps> = async (props) => {
	const searchParams = await props.searchParams;
	return (
		<LoaderProducts
			limit={8}
			searchParams={searchParams}
			listType="four_grid"
		/>
	);
};

export default Page;
