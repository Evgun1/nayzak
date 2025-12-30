import classes from "./Banner.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";
import React, { FunctionComponent } from "react";

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
	return (
		<>
			<Skeleton className={classes["skeleton__item"]} />
			<div className={classes["skeleton__list"]}>
				<Skeleton className={classes["skeleton__list-item"]} />
				<Skeleton className={classes["skeleton__list-item"]} />
				<Skeleton className={classes["skeleton__list-item"]} />

				<Skeleton className={classes["skeleton__list-item"]} />
			</div>
		</>
	);
};

export default Loading;
