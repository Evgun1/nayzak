import classes from "./Review.module.scss";
import Skeleton from "@/components/skeleton/Skeleton";

const reviewLength = Array.from({ length: 2 });

const Loading = () => {
	return (
		<div className={classes["review-skeleton"]}>
			<div className={classes["review-skeleton__header"]}>
				<Skeleton
					className={classes["review-skeleton__header-title"]}
				/>
				<div className={classes["review-skeleton__header-flex"]}>
					<div style={{ display: "flex" }}>
						<Skeleton
							className={classes["review-skeleton__header-item"]}
						/>
						<Skeleton
							className={classes["review-skeleton__header-item"]}
						/>
					</div>
					<Skeleton
						className={classes["review-skeleton__header-button"]}
					/>
				</div>
			</div>

			{reviewLength.map((_, i) => (
				<div
					className={classes["review-skeleton__item"]}
					key={i}
				>
					<div className={classes["review-skeleton__item-header"]}>
						<Skeleton
							className={classes["review-skeleton__item-avatar"]}
						/>
						<div className={classes["review-skeleton__grid"]}>
							<Skeleton
								className={
									classes["review-skeleton__grid-item"]
								}
							/>
							<Skeleton
								className={
									classes["review-skeleton__grid-item"]
								}
							/>
							<Skeleton
								className={
									classes["review-skeleton__grid-item"]
								}
							/>
						</div>
					</div>
					<div className={classes["review-skeleton__text"]}>
						<Skeleton
							className={classes["review-skeleton__text-item"]}
						/>
						<Skeleton
							className={classes["review-skeleton__text-item"]}
						/>
						<Skeleton
							className={classes["review-skeleton__text-item"]}
						/>
					</div>
				</div>
			))}
		</div>
	);
};
// const Loading = () => {
// 	return <ReviewSkeleton />;
// };
export default Loading;
