import Skeleton from "@/components/skeleton/Skeleton";
import classes from "./Filter.module.scss";

const lengthParent = Array.from({ length: 2 });
const lengthChildren = Array.from({ length: 5 });

const Loading = () => {
	return (
		<div className={classes["loading"]}>
			<div className={classes["loading__skeleton"]}>
				<Skeleton className={classes["loading__skeleton-header"]} />
				<Skeleton className={classes["loading__price-input"]} />
				<Skeleton className={classes["loading__price-item"]} />
			</div>
			<div className={classes["loading__skeleton"]}>
				<Skeleton className={classes["loading__skeleton-header"]} />
				<div className={classes["loading__color-list"]}>
					{lengthChildren.map((_, i) => (
						<Skeleton key={i} className={classes["loading__color-item"]} />
					))}
				</div>
			</div>

			{lengthParent.map((_, i) => (
				<div
					className={classes["loading__skeleton"]}
					key={i}
				>
					<Skeleton className={classes["loading__skeleton-header"]} />
					<div className={classes["loading__skeleton-list"]}>
						{lengthChildren.map((_, i) => (
							<Skeleton
								key={i}
								className={classes["loading__skeleton-item"]}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default Loading;
