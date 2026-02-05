import ProductsImageSkeleton from "../@images/skeleton/ProductsImageSkeleton";
import classes from "./Product.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";

const Loading = () => {
	return (
		<div className={classes["loading"]}>
			<div>
				<div className={classes["loading__grid"]}>
					<Skeleton className={classes["loading__grid-item"]} />
					<Skeleton className={classes["loading__grid-item"]} />
					<Skeleton className={classes["loading__grid-item"]} />
					<Skeleton className={classes["loading__grid-item"]} />
					<Skeleton className={classes["loading__grid-item"]} />
				</div>

				<div className={classes["loading__grid"]}>
					<Skeleton className={classes["loading__grid-item"]} />
					<Skeleton className={classes["loading__grid-item"]} />
				</div>
			</div>
		</div>
	);
};

export default Loading;
