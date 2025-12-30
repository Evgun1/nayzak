import classes from "./HeaderActionMobileSkeleton.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";

const HeaderActionMobileSkeleton = () => {
	return (
		<div className={classes["skeleton"]}>
			<Skeleton className={classes["skeleton__item"]} />
			<Skeleton className={classes["skeleton__item"]} />
		</div>
	);
};

export default HeaderActionMobileSkeleton;
