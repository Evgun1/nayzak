import { FC, ReactNode } from "react";
import LinkCustom, {
    HrefObject,
} from "../custom-elements/link-custom/LinkCustom";

import classes from "./Navbar.module.scss";
type NavbarItemProps = {
    children: ReactNode;
    href: HrefObject;
};

const NavbarItem: FC<NavbarItemProps> = (props) => {
    const { children, href } = props;
    return (
        <LinkCustom
            className={classes["navbar__item"]}
            href={href}
            styleSettings={{
                color: "LIGHT",
                size: "MEDIUM",
                type: "DEFAULT",
                fill: "SOLID",
            }}
        >
            {children}
        </LinkCustom>
    );
};

export default NavbarItem;
