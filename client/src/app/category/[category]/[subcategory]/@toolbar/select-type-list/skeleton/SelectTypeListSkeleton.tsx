import Skeleton from "@/components/skeleton/Skeleton";
import classes from "./SelectTypeListSkeleton.module.scss";

const typeListLength = Array.from({ length: 5 });

const SelectTypeListSkeleton = () => {
	return (
		<div className={classes["skeleton-list"]}>
			{typeListLength.map((item) => (
				<Skeleton className={classes["skeleton-list__item"]} />
			))}
		</div>
	);
};

export default SelectTypeListSkeleton;
    