import React, {
    FC,
    forwardRef,
    ReactElement,
    ReactNode,
    useContext,
    useEffect,
    useId,
    useImperativeHandle,
} from "react";
import classes from "./Navbar.module.scss";
import childrenRecursion from "@/utils/ChildrenRecursionT";
import NavbarBody from "./NavbarBody";
import NavbarItem from "./NavbarItem";
import NavbarTrigger from "./NavbarTrigger";
import { NavbarProvider } from "./NavbarContext";

type NavbarContentProps = {
    children: ReactNode;
};

const NavbarContent: FC<NavbarContentProps> = (props) => {
    const { children } = props;
    const generateId = useId().replaceAll(":", "");
    const navbarContentId = `navbar-content__${generateId}`;

    // const currChildren = childrenRecursion({
    //     children,
    //     childType: NavbarTrigger,
    // });

    return (
        <NavbarProvider navbarId={navbarContentId}>
            <div id={navbarContentId} className={classes["navbar__content"]}>
                {children}
            </div>
        </NavbarProvider>
    );
};

export default NavbarContent;
