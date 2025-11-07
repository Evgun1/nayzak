import classes from "./ProductsGridSkeleton.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import React from "react";

const skeletonItems = Array.from({ length: 8 });

export default function ProductsGridSkeleton() {
	return (
		<div className={classes["skeleton"]}>
			<div
				className={`${ButtonClassList.BUTTON_X_LARGE} ${classes["skeleton__header"]}`}
			>
				<span>You’re browsing</span>
				<ButtonCustom
					styleSettings={{
						color: "DARK",
						fill: "SOLID",
						size: "X_LARGE",
						type: "UNDERLINE",
						icon: { right: "CHEVRON" },
						roundness: "SHARP",
					}}
				>
					Categories
				</ButtonCustom>
				<span>In</span>
				<ButtonCustom
					styleSettings={{
						color: "DARK",
						fill: "SOLID",
						size: "X_LARGE",
						type: "UNDERLINE",
						icon: { right: "CHEVRON" },
						roundness: "SHARP",
					}}
				>
					Subcategories
				</ButtonCustom>
			</div>
			<ul className={classes["skeleton__list"]}>
				{skeletonItems.map((_, idx) => (
					<li
						key={idx}
						className={classes["skeleton__item"]}
					>
						<Skeleton className={classes["skeleton__prev"]}>
							<Skeleton
								className={classes["skeleton__prev-img"]}
							/>
							<Skeleton
								className={classes["skeleton__prev-item"]}
							/>
							<Skeleton
								className={classes["skeleton__prev-item"]}
							/>
						</Skeleton>
					</li>
				))}
			</ul>
		</div>
	);
}
