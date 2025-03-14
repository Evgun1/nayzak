import React, { FC, ReactElement, ReactNode } from "react";
import NavbarContent from "./NavbarContent";
import NavbarTrigger from "./NavbarTrigger";
import NavbarBody from "./NavbarBody";
import NavbarItem from "./NavbarItem";
import childrenRecursion from "@/utils/ChildrenRecursionT";

import classes from "./Navbar.module.scss";
type NavbarProps = {
    children: ReactElement[];
};

const NavbarComponent: FC<NavbarProps> = (props) => {
    const { children } = props;

    const contentChildren = childrenRecursion({
        children,
        childType: NavbarContent,
    });

    return <div className={classes["navbar"]}>{contentChildren}</div>;
};

const Navbar = Object.assign(NavbarComponent, {
    Content: NavbarContent,
    Trigger: NavbarTrigger,
    Body: NavbarBody,
    Item: NavbarItem,
});

export default Navbar;
