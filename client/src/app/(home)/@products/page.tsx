"use server";

import classes from "./ProductGrid.module.scss";

import ProductGridHeader from "./components/ProductGridHeader";
import dynamic from "next/dynamic";
import LoaderProducts from "@/components/loader/products/LoaderProducts";
import { FC } from "react";

const ProductGridHeaderDynamic = dynamic(
	() => import("./components/ProductGridHeader"),
	{ ssr: false },
);

type ProductGridProps = {
	searchParams: Record<string, any>;
};
const Page: FC<ProductGridProps> = ({ searchParams }) => {
	return (
		<LoaderProducts
			limit={8}
			searchParams={searchParams}
			listType="four_grid"
		/>
	);
};

export default Page;
