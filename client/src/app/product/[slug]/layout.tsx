"use server";
import React from "react";
import classes from "./style.module.scss";
import ProductsImage from "./_products-image/ProductsImage";
import dynamic from "next/dynamic";
import ProductsImageSkeleton from "./_products-image/skeleton/ProductsImageSkeleton";

const ProductsImageDynamic = dynamic(
	() => import("./_products-image/ProductsImage"),
	{ ssr: false, loading: () => <ProductsImageSkeleton /> },
);
export default async function RootLayout(props: {
	children: React.ReactNode;
	tabs: React.ReactNode;
	params: { slug: string };
}) {
	const { children } = props;

	return (
		<section>
			<div className="container">
				<div className={classes["product-loop"]}>
					<div className={classes["product-loop__image-wrapper"]}>
						<ProductsImageDynamic params={props.params} />
					</div>
					{children}
				</div>
			</div>
		</section>
	);
}
