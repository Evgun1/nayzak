import { FC, ReactNode } from "react";
import classes from "./Navbar.module.scss";

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
