import classes from "./Content.module.scss";
import Title from "../custom-elements/title/Title.tsx";
import { FC, ReactNode } from "react";

const Content: FC<{ vie: () => ReactNode; label: string }> = ({
	vie,
	label,
}) => {
	return (
		<div className={classes["content"]}>
			<Title>{label}</Title>
			{vie()}
		</div>
	);
};

export default Content;
