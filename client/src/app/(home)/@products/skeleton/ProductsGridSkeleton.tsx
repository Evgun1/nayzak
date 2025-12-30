import classes from "./ProductsGridSkeleton.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import React from "react";

const skeletonItems = Array.from({ length: 8 });

export default function ProductsGridSkeleton() {
	return (
		<div className={classes["skeleton-grid"]}>
			<ul className={classes["skeleton-grid__list"]}>
				{skeletonItems.map((_, idx) => (
					<li
						key={idx}
						className={classes["skeleton-grid__item"]}
					>
						<Skeleton className={classes["skeleton-grid__prev"]}>
							<Skeleton
								className={classes["skeleton-grid__prev-img"]}
							/>
							<Skeleton
								className={classes["skeleton-grid__prev-item"]}
							/>
							<Skeleton
								className={classes["skeleton-grid__prev-item"]}
							/>
						</Skeleton>
					</li>
				))}
			</ul>
		</div>
	);
}
