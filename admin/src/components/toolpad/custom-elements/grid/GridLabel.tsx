import classes from "./GridLabel.module.scss";
import { FC, ReactNode } from "react";

const GridLabel: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className={classes["label"]}>{children}</div>;
};

export default GridLabel;
