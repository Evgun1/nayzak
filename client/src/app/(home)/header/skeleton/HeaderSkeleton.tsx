import classes from "./HeaderSkeleton.module.scss";
import DisplayIcon from "@/components/icons/displayIcon";
import IconsIdList from "@/components/icons/IconsIdList";
import Skeleton from "@/components/skeleton/Skeleton";

const navbarLength = Array.from({ length: 4 });
const actionLength = Array.from({ length: 3 });

const HeaderSkeleton = () => {
	return (
		<div className="container">
			<div className={classes["header-skeleton"]}>
				<DisplayIcon
					className={classes["header-skeleton__logo"]}
					iconName={IconsIdList.LOGOTYPE}
				/>
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
			</div>
		</div>
	);
};
export default HeaderSkeleton;
