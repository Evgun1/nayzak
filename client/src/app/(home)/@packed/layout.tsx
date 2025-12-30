import classes from "./ActionPacked.module.scss";
import { FunctionComponent, ReactNode } from "react";

interface LayoutPackedProps {
	children: ReactNode;
}

const LayoutPacked: FunctionComponent<LayoutPackedProps> = (props) => {
	const { children } = props;
	return (
		<section>
			<div className={`${classes["packed-container"]} container`}>
				{children}
			</div>
		</section>
	);
};

export default LayoutPacked;
