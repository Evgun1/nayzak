import Skeleton from "@/components/skeleton/Skeleton";
import classes from "./ProductsGridHeaderSkeleton.module.scss";
import { FunctionComponent } from "react";

interface ProductsGridHeaderSkeletonProps {}

const ProductsGridHeaderSkeleton: FunctionComponent<
	ProductsGridHeaderSkeletonProps
> = () => {
	return (
		<div className={classes["skeleton-header"]}>
			<Skeleton className={classes["skeleton-header__item"]} />
			<Skeleton className={classes["skeleton-header__item"]} />
			<Skeleton className={classes["skeleton-header__item"]} />
			<Skeleton className={classes["skeleton-header__item"]} />
		</div>
	);
};

export default ProductsGridHeaderSkeleton;
