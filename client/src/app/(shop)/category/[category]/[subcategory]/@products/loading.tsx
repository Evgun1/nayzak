
import { ReactElement } from "react";
import classes from "./ProductsLayout.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";

const Loading = (props: any) => {
	const productsElementArr: ReactElement[] = [];

	for (let index = 1; index <= 15; index++) {
		productsElementArr.push(
			<div className={classes["loading-skeleton__preview"]}>
				<Skeleton
					className={classes["loading-skeleton__preview-img"]}
				/>
				<Skeleton
					className={classes["loading-skeleton__preview-item"]}
				/>
				<Skeleton
					className={classes["loading-skeleton__preview-item"]}
				/>
				<Skeleton
					className={classes["loading-skeleton__preview-item"]}
				/>
			</div>,
		);
	}

	return (
		<div className={classes["loading-skeleton"]}>{productsElementArr}</div>
	);
};

export default Loading;
