"use server";

import classes from "./Products.module.scss";
import { FC } from "react";
import dynamic from "next/dynamic";
import { FilterProvider } from "./filter/useFilter";
import LoaderProducts from "@/components/loader/products/LoaderProducts";
import Toolbar from "./toolbar/Toolbar";
import { appProductsGet } from "@/lib/api/products";
import Filter from "./filter/Filter";

type ProductsProps = {
	searchParams: URLSearchParams;
	params: { id: number }[];
};

const SidebarDynamic = dynamic(() => import("./filter/Filter"), {
	ssr: false,
	loading: () => <></>,
});

const ProductsSection: FC<ProductsProps> = async ({ params, searchParams }) => {
	const urlSearchParams = new URLSearchParams(searchParams);

	const { productCounts } = await appProductsGet({
		searchParams: urlSearchParams,
		params: params.map((val) => val.id),
	});

	return (
		<FilterProvider>
			<div className={`container`}>
				<div className={classes.products}>
					<Filter />
					<div className={classes["products__main"]}>
						<Toolbar productsCount={productCounts} />
						<LoaderProducts
							className={classes["products__preview"]}
							showRating
							searchParams={searchParams}
							params={params.map((val) => val.id)}
						/>
					</div>
				</div>
			</div>
		</FilterProvider>
	);
};

export default ProductsSection;
