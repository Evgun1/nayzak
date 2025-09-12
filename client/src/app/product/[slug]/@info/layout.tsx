import { FC, ReactNode } from "react";
import classes from "./Product.module.scss";

type LayoutInfoProps = {
	children: ReactNode;
	images: ReactNode;
};

const LayoutInfo: FC<LayoutInfoProps> = (props) => {
	const { children, images } = props;
	return (
		<section>
			<div className="container">
				<div className={classes["product-layout"]}>
					{images}
					{children}
				</div>
			</div>
		</section>
	);
};

export default LayoutInfo;
