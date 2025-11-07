import { FC, ReactNode } from "react";
import classes from "./ToolbarLayout.module.scss";

interface ToolbarLayoutProps {
	children: ReactNode;
	chips: ReactNode;
}

const ToolbarLayout: FC<ToolbarLayoutProps> = ({ children, chips }) => {
	return (
		<div className={classes["toolbar"]}>
			{children}
			{chips}
		</div>
	);
};

export default ToolbarLayout;
