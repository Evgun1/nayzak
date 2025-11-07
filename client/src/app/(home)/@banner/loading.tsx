import classes from "./Banner.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";
import React, { FunctionComponent } from "react";

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
	return (
		<React.Fragment>
			<Skeleton className={classes["loading__item"]} />
			<div className={classes["loading__list"]}>
				<Skeleton className={classes["loading__item"]} />
				<Skeleton className={classes["loading__item"]} />
				<Skeleton className={classes["loading__item"]} />

				<Skeleton className={classes["loading__item"]} />
			</div>
		</React.Fragment>
	);
};

export default Loading;
