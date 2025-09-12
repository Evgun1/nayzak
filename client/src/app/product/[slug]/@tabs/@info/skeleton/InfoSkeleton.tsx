import React from "react";
import classes from "./InfoSkeleton.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";
const infoLength = Array.from({ length: 3 });
const InfoSkeleton = () => {
	return (
		<div className={classes["info-skeleton"]}>
			{infoLength.map((_, i) => (
				<React.Fragment key={i}>
					<Skeleton className={classes["info-skeleton__item"]} />
					<Skeleton className={classes["info-skeleton__item"]} />
				</React.Fragment>
			))}
		</div>
	);
};
export default InfoSkeleton;
