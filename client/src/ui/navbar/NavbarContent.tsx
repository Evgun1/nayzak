"use client";

import React, { FC, ReactNode, useEffect, useId } from "react";
import classes from "./Navbar.module.scss";
import { useNavbar } from "./NavbarContext";

type NavbarContentProps = {
	children: ReactNode;
};

const NavbarContent: FC<NavbarContentProps> = (props) => {
	const { children } = props;
	const generateId = useId().replaceAll(":", "");
	const navbarContentId = `navbar-content__${generateId}`;

	const { addNavbarId } = useNavbar();

	useEffect(() => {
		addNavbarId(navbarContentId);
	}, [addNavbarId, navbarContentId]);

	return (
		<div
			id={navbarContentId}
			className={classes["navbar__content"]}
		>
			{children}
		</div>
	);
};

export default NavbarContent;
