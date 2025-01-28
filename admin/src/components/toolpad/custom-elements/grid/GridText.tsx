import classes from "./GridText.module.scss";
import { FC, ReactNode } from "react";

type GridTextProps = {
	children: ReactNode;
	width?: number;
};

const GridText: FC<GridTextProps> = ({ children, width }) => {
	return (
		<div
			style={{ maxWidth: width ?? "max-content" }}
			className={classes["text"]}
		>
			{children}
		</div>
	);
};

export default GridText;
