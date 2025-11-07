import Skeleton from "@/components/skeleton/Skeleton";
import classes from "./FilterChips.module.scss";

const skeletonLength = Array.from({ length: 4 });

const Loading = () => {
	return (
		<div className={classes["loading"]}>
			{skeletonLength.map((_, i) => (
				<Skeleton
					key={i}
					className={classes["loading__item"]}
				/>
			))}
		</div>
	);
};

export default Loading;
