import { FC, ReactNode } from "react";
import classes from "./Navbar.module.scss";
import { NavbarProvider } from "./NavbarContext";

type NavbarBodyProps = {
    children: ReactNode;
};

const NavbarBody: FC<NavbarBodyProps> = (props) => {
    const { children } = props;

    return (
        <div id='navbar-body' className={classes["navbar__body"]}>
            {children}
        </div>
    );
};

export default NavbarBody;
