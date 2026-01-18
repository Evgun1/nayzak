import classes from "./ProductsPreviewDefaultSkeleton.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";
import { FC } from "react";

const ProductPreviewDefaultSkeleton: FC = (props) => {
	return (
		<div className={classes["skeleton"]}>
			<Skeleton className={classes["skeleton__item"]} />
			<Skeleton className={classes["skeleton__item"]} />
			<Skeleton className={classes["skeleton__item"]} />
		</div>
	);
};

export default ProductPreviewDefaultSkeleton;
