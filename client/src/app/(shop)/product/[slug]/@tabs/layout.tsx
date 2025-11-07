"use server";

import Tabs from "@/ui/tabs/Tabs";
import React, { FC, ReactNode } from "react";
import "../style.scss";

type TabsLayoutProps = {
	description: ReactNode;
	info: ReactNode;
	reviews: ReactNode;
};

const TabsLayout: FC<TabsLayoutProps> = async (props) => {
	const { description, info, reviews } = props;

	const TABS_MAP = [
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
			<div className="product-container">
				<Tabs>
					<Tabs.Header>
						{TABS_MAP.map((item, i) => (
							<Tabs.Toggle
								key={i}
								index={i}
								label={item.label}
							/>
						))}
					</Tabs.Header>
					<Tabs.Body>
						{TABS_MAP.map((item, i) => (
							<React.Fragment key={i}>
								{item.content}
							</React.Fragment>
						))}
					</Tabs.Body>
				</Tabs>
			</div>
		</section>
	);
};

export default TabsLayout;
