import classes from "./Toolbar.module.scss";
import Header from "./header/Header.tsx";
import Sidebar from "./sidebar/Sidebar.tsx";
import Content from "./content/Content.tsx";
import { FC, ReactNode } from "react";

const ToolbarComponent: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className={classes["toolPad"]}>
			<Sidebar />
			<div className={classes["toolPad--items"]}>
				<Header />
				{children}
			</div>
		</div>
	);
};

export const Toolbar = Object.assign(ToolbarComponent, {
	Content: Content,
});

