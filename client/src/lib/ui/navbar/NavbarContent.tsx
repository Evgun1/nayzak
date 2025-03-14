import React, { FC, ReactElement, ReactNode, useContext, useId } from "react";
import classes from "./Navbar.module.scss";
import childrenRecursion from "@/utils/ChildrenRecursionT";
import NavbarBody from "./NavbarBody";
import NavbarItem from "./NavbarItem";
import NavbarTrigger from "./NavbarTrigger";
type NavbarContentProps = {
    children: ReactNode;
};

const NavbarContent: FC<NavbarContentProps> = (props) => {
    const { children } = props;
    const generateId = useId().replaceAll(":", "");
    const navbarContentId = `navbar-content__${generateId}`;

    const currChildren = childrenRecursion({
        children,
        childType: NavbarTrigger,
    });

    const childrenContent = (children: ReactNode) => {
        return React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;
            if (child.type === NavbarTrigger) {
                const triggerChild = child as ReactElement<{
                    contentId: string;
                }>;
                return React.cloneElement(triggerChild, {
                    contentId: navbarContentId,
                });
            } else {
                return child;
            }
        });
    };

    return (
        <div id={navbarContentId} className={classes["navbar__content"]}>
            {childrenContent(currChildren)}
        </div>
    );
};

export default NavbarContent;
