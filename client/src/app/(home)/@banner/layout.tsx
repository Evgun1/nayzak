import classes from "./Banner.module.scss";
import { FunctionComponent, ReactNode } from "react";

interface LayoutBannerProps {
	children: ReactNode;
}

const LayoutBanner: FunctionComponent<LayoutBannerProps> = ({ children }) => {
	return <div className={classes.banner}>{children}</div>;
};

export default LayoutBanner;
