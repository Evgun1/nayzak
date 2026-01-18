"use server";

import classes from "./Tabs.module.scss";
import React, { FC, ReactNode } from "react";
import "../style.scss";
import TabsNavigation from "./components/TabsNavigation";

type TabsLayoutProps = {
	description: ReactNode;
	info: ReactNode;
	reviews: ReactNode;
};

interface TabsMapItem {
	label: string;
	content: ReactNode;
}
export type TabsMapType = Array<TabsMapItem>;

const TabsLayout: FC<TabsLayoutProps> = async (props) => {
	const { description, info, reviews } = props;

	const TABS_MAP: TabsMapType = [
		{
			label: "Description",
			content: description,
		},
		{
			label: "Additional Info",
			content: info,
		},
		{
			label: "Reviews",
			content: reviews,
		},
	];

	return (
		<section>
			<div className={`product-container`}>
				<TabsNavigation tabs={TABS_MAP} />
			</div>
		</section>
	);
};

export default TabsLayout;
