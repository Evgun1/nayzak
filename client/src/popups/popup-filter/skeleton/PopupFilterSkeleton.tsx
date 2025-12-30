import classes from "./PopupFilterSkeleton.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";
import { FunctionComponent } from "react";

interface PopupFilterSkeletonProps {}

const colorLength = Array.from({ length: 10 });
const itemLength = Array.from({ length: 6 });

const PopupFilterSkeleton: FunctionComponent<PopupFilterSkeletonProps> = () => {
	return (
		<div className={classes["skeleton"]}>
			<div className={classes["skeleton__header"]}>
				<Skeleton className={classes["skeleton__header-item"]}/>
				<Skeleton className={classes["skeleton__header-item"]}/>
			</div>

			<div className={classes["skeleton__list"]}>
				<div className={classes["skeleton__item"]}>
					<Skeleton className={classes["skeleton__item-title"]} />
					<div className={classes["skeleton__content"]}>
						{colorLength.map((_, index) => (
							<Skeleton
								key={index}
								className={classes["skeleton__content-item"]}
							/>
						))}
					</div>
				</div>
				<div className={classes["skeleton__item"]}>
					<Skeleton className={classes["skeleton__item-title"]} />

					<div className={classes["skeleton__content"]}>
						{itemLength.map((_, index) => (
							<Skeleton
								key={index}
								className={classes["skeleton__content-item"]}
							/>
						))}
					</div>
				</div>
				<div className={classes["skeleton__item"]}>
					<Skeleton className={classes["skeleton__item-title"]} />
					<div className={classes["skeleton__content"]}>
						{itemLength.map((_, index) => (
							<Skeleton
								key={index}
								className={classes["skeleton__content-item"]}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopupFilterSkeleton;
