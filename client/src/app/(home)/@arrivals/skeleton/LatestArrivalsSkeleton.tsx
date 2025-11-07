import classes from "./LatestArrivalsSkeleton.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";
import React from "react";

const skeletonItems = Array.from({ length: 4 });

export default function LatestArrivalsSkeleton() {
	return (
		<div className={classes["skeleton"]}>
			<div className={classes["skeleton__header"]}>
				<h5>Latest Arrivals</h5>
				<Skeleton className={classes["skeleton__header-btn"]} />
			</div>

			<ul className={classes["skeleton__list"]}>
				{skeletonItems.map((_, idx) => (
					<Skeleton
						className={classes["skeleton__item"]}
						key={idx}
					>
						<Skeleton className={classes["skeleton__item-img"]} />
						<Skeleton className={classes["skeleton__item-text"]} />
						<Skeleton className={classes["skeleton__item-text"]} />
					</Skeleton>
				))}
			</ul>
		</div>
	);
}
