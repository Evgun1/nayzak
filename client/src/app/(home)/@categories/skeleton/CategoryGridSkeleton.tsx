import classes from "./CategoryGridSkeleton.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";
import React from "react";

const skeletonItems = Array.from({ length: 4 });

export default function CategoryGridSkeleton() {
	return (
		<ul className={classes["skeleton__list"]}>
			{skeletonItems.map((_, idx) => (
				<li
					key={idx}
					className={classes["skeleton__item"]}
				>
					<Skeleton className={classes["skeleton__item-img"]}>
						<Skeleton className={classes["skeleton__item-btn"]} />
					</Skeleton>
				</li>
			))}
		</ul>
	);
}
