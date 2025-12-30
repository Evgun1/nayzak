import React, { FunctionComponent, ReactNode } from "react";
import { log } from "util";
import LatestArrivalsSkeleton from "./@arrivals/skeleton/LatestArrivalsSkeleton";
import CategoryGridSkeleton from "./@categories/skeleton/CategoryGridSkeleton";

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
	const { arrivals, banner, categories, icons, packed, products, trending } =
		props;

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
