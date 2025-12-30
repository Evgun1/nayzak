"use client";
import classes from "./HeaderNavbar.module.scss";

import Navbar from "@/ui/navbar/Navbar";
import { NavigationItem } from "./HeaderNavbar";
import { FC } from "react";

type HeaderActionProps = {
	navigation: NavigationItem[];
};

const HeaderAction: FC<HeaderActionProps> = (props) => {
	const { navigation } = props;

	return (
		<Navbar>
			{navigation.map((outsideItem, i) => (
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

export default HeaderAction;
