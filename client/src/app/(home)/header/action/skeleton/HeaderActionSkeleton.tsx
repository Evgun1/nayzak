import { FC } from "react";
import classes from "./HeaderActionSkeleton.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";
const actionLength = Array.from({ length: 3 });

const HeaderActionSkeleton = () => {
	return (
		<div className={classes["header-action-skeleton"]}>
			{actionLength.map((_, i) => (
				<Skeleton
					key={i}
					className={classes["header-action-skeleton__item"]}
				/>
			))}
		</div>
	);
};

export default HeaderActionSkeleton;
