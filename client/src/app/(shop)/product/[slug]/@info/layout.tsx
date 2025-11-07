import { FC, ReactNode } from "react";
import classes from "./Product.module.scss";
import Loading from "./loading";
import "../style.scss";

type LayoutInfoProps = {
	children: ReactNode;
	images: ReactNode;
};

const LayoutInfo: FC<LayoutInfoProps> = (props) => {
	const { children, images } = props;
	return (
		<section>
			<div className={"product-container"}>
				<div className={classes["product-layout"]}>
					{images}
					{children}
				</div>
			</div>
		</section>
	);
};

export default LayoutInfo;
