import Skeleton from "@/components/skeleton/Skeleton";
import React from "react";
import classes from "./CategoriesGrid.module.scss";

const skeletonItems = Array.from({ length: 4 });
import CategoryGridSkeleton from "./skeleton/CategoryGridSkeleton";

const Loading = () => {
	// return <CategoryGridSkeleton />;
	return (
		<ul className={classes["skeleton"]}>
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
};

export default Loading;
