import Skeleton from "@/components/skeleton/Skeleton";
import classes from "./ProductsImageSkeleton.module.scss";

const imageLength = Array.from({ length: 4 });

const ProductsImageSkeleton = () => {
	return (
		<div className={classes["product-image-skeleton"]}>
			<Skeleton className={classes["product-image-skeleton__image"]} />
			<div className={classes["product-image-skeleton__list"]}>
				{imageLength.map((_, i) => (
					<Skeleton
						key={i}
						className={classes["product-image-skeleton__item"]}
					/>
				))}
			</div>
		</div>
	);
};

export default ProductsImageSkeleton;
