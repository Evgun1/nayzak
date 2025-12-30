import classes from "./ProductGrid.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";
const skeletonItems = Array.from({ length: 8 });

const Loading = () => {
	return (
		<div className={classes["skeleton"]}>
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
};

export default Loading;
