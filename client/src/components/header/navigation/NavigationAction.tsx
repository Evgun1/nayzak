"use client";
import Navbar from "@/ui/navbar/Navbar";
import React from "react";

interface NavigationActionProps {
	navigationData: NavigationItem[];
}

interface NavigationItem {
	label: string;
	url: string;
	active?: boolean;
	children?: NavigationItem[];
}
export type AppNavigation = NavigationItem[];

const NavigationAction: React.FC<NavigationActionProps> = ({
	navigationData,
}) => {
	return (
		<Navbar>
			{navigationData.map((outsideItem, i) => (
				<Navbar.Content key={i}>
					<Navbar.Trigger
						href={{
							endpoint: `/category/${outsideItem.url}`,
						}}
					>
						{outsideItem.label}
					</Navbar.Trigger>

					<Navbar.Body>
						{outsideItem.children &&
							outsideItem.children.length > 0 &&
							outsideItem.children.map((insideItem, i) => (
								<Navbar.Item
									key={i}
									href={{
										endpoint: `/category/${outsideItem.url}/${insideItem.url}`,
									}}
								>
									{insideItem.label}
								</Navbar.Item>
							))}
					</Navbar.Body>
				</Navbar.Content>
			))}
		</Navbar>
	);
};

export default NavigationAction;
