"use server";

import classes from "./ProductGrid.module.scss";

import ProductGridHeader from "./ProductGridHeader";
import dynamic from "next/dynamic";
import LoaderProducts from "@/components/loader/products/LoaderProducts";
import { FC } from "react";

type ProductGridProps = {
	searchParams: Record<string, any>;
};
const ProductGrid: FC<ProductGridProps> = ({ searchParams }) => {
	return (
		<section className="section">
			<div className="container">
				<div className={classes["product-grid"]}>
					<ProductGridHeader searchParams={searchParams} />
					<LoaderProducts
						searchParams={searchParams}
						// className={classes["product-grid__product"]}
						listType="four_grid"
					/>
				</div>
			</div>
		</section>
	);
};

export default ProductGrid;
