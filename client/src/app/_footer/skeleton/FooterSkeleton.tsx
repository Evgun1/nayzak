import classes from "./FooterSkeleton.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";
import { FunctionComponent } from "react";

interface FooterSkeletonProps {}

const FooterSkeleton: FunctionComponent<FooterSkeletonProps> = () => {
	return (
		<section>
			<div className="container">
				<div className={classes["footer-skeleton"]}>
					<div className={classes["footer-skeleton__top"]}>
						<div className={classes["footer-skeleton__header"]}>
							<Skeleton
								className={
									classes["footer-skeleton__header-item"]
								}
							/>
							<Skeleton
								className={
									classes["footer-skeleton__header-item"]
								}
							/>
						</div>
						<div className={classes["footer-skeleton__list"]}>
							{Array.from({ length: 3 }).map((_, i) => (
								<div
									key={i}
									className={
										classes["footer-skeleton__list-item"]
									}
								>
									<Skeleton />
									{Array.from({ length: 4 }).map((_, i) => (
										<Skeleton key={i} />
									))}
								</div>
							))}
						</div>
					</div>
					<div className={classes["footer-skeleton__bottom"]}>
						<Skeleton
							className={classes["footer-skeleton__bottom-span"]}
						/>
						<div
							className={classes["footer-skeleton__bottom-list"]}
						>
							<Skeleton />
							<Skeleton />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FooterSkeleton;
