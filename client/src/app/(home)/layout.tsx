import React, { FunctionComponent, ReactNode } from "react";
import { log } from "util";

interface LayoutHomeProps {
	children: ReactNode;
	arrivals: ReactNode;
	banner: ReactNode;
	categories: ReactNode;
	icons: ReactNode;
	packed: ReactNode;
	products: ReactNode;
	trending: ReactNode;
}

const LayoutHome: FunctionComponent<LayoutHomeProps> = (props) => {
	const {
		children,
		arrivals,
		banner,
		categories,
		icons,
		packed,
		products,
		trending,
	} = props;

	return (
		<React.Fragment>
			{banner}
			{arrivals}
			{categories}
			{products}
			{trending}
			{packed}
			{icons}
		</React.Fragment>
	);
};

export default LayoutHome;
