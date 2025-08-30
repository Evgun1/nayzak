import { FC, ReactNode } from "react";
import classes from "./Skeleton.module.scss";

type SkeletonProps = {
	children?: ReactNode;
	className?: string;
};

const Skeleton: FC<SkeletonProps> = (props) => {
	const { children } = props;

	return (
		<div
			className={`${props.className ? props.className : ""} ${
				children ? classes["skeleton--parent"] : classes["skeleton"]
			}`}
		>
			{children ? children : <></>}
		</div>
	);
};

export default Skeleton;
