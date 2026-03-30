"use client";

import Navbar from "@/ui/navbar/Navbar";
import { FC } from "react";
import { NavigationItem } from "./HeaderNav";

type HeaderNavbarProps = {
	navigation: NavigationItem[];
};

const HeaderNavbar: FC<HeaderNavbarProps> = (props) => {
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

export default HeaderNavbar;
