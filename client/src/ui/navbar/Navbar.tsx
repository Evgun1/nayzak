"use client";

import React, { FC, ReactElement, ReactNode } from "react";
import NavbarContent from "./NavbarContent";
import NavbarTrigger from "./NavbarTrigger";
import NavbarBody from "./NavbarBody";
import NavbarItem from "./NavbarItem";
import childrenRecursion from "@/utils/childrenRecursionT";

import classes from "./Navbar.module.scss";
import { NavbarProvider } from "./NavbarContext";
type NavbarProps = {
	children: ReactNode;
};

const NavbarComponent: FC<NavbarProps> = (props) => {
	const { children } = props;

	// const contentChildren = childrenRecursion({
	//     children,
	//     childType: NavbarContent,
	// });

	return (
		<div className={classes["navbar"]}>
			<NavbarProvider>{children}</NavbarProvider>
		</div>
	);
};

const Navbar = Object.assign(NavbarComponent, {
	Content: NavbarContent,
	Trigger: NavbarTrigger,
	Body: NavbarBody,
	Item: NavbarItem,
});

export default Navbar;
