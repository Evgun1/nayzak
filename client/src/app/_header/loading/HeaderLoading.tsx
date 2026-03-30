import classes from "./HeaderLoading.module.scss";
import DisplayIcon from "@/components/icons/displayIcon";
import IconsIdList from "@/components/icons/IconsIdList";
import Skeleton from "@/components/skeleton/Skeleton";
import { FunctionComponent } from "react";

interface HeaderLoadingProps {}

const navbarLength = Array.from({ length: 4 });
const actionLength = Array.from({ length: 3 });

const HeaderLoading: FunctionComponent<HeaderLoadingProps> = () => {
	return (
		<>
			<div className={classes["header-skeleton__navbar"]}>
				{navbarLength.map((_, i) => (
					<Skeleton
						key={i}
						className={classes["header-skeleton__navbar-item"]}
					/>
				))}
			</div>
			<div className={classes["header-skeleton__action"]}>
				{actionLength.map((_, i) => (
					<Skeleton
						key={i}
						className={classes["header-skeleton__action-item"]}
					/>
				))}
			</div>
		</>
	);
};

export default HeaderLoading;
