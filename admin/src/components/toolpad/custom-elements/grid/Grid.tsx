import classes from "./Grid.module.scss";
import React, { FC, ReactNode } from "react";
import GridLabel from "./GridLabel.tsx";
import GridText from "./GridText.tsx";

type GridProps = {
	children: ReactNode;
};

const GridComponent: FC<GridProps> = ({ children }) => {
	return (
		<div className={classes["grid"]}>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return (
						<div>
							{React.Children.map(child.props.children, (item) => {
								return <>{React.cloneElement(item)} </>;
							})}
						</div>
					);
				}
				return child;
			})}
		</div>
	);
};

export const Grid = Object.assign(GridComponent, {
	label: GridLabel,
	text: GridText,
});
