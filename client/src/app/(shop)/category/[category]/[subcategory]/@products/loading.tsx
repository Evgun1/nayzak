import { ReactElement } from "react";
import classes from "./ProductsLayout.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";
import ProductPreviewDefaultSkeleton from "@/components/product-preview/product-preview-default/skeleton/ProductsPreviewDefaultSkeleton";

const Loading = (props: any) => {
	const productsElementArr: ReactElement[] = [];

	for (let index = 1; index <= 15; index++) {
		productsElementArr.push(<ProductPreviewDefaultSkeleton key={index} />);
	}

	return (
		<div className={classes["loading-skeleton"]}>{productsElementArr}</div>
	);
};

export default Loading;
