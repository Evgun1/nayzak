"use client";

import React, {
    FC,
   
    ReactNode,
   
    useLayoutEffect,
    
} from "react";
import classes from "./Navbar.module.scss";
import LinkCustom, {
    HrefObject,
} from "../custom-elements/link-custom/LinkCustom";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs.copy";
import { useNavbar } from "./NavbarContext";

type NavbarTriggerProps = {
    children: ReactNode;
    href: HrefObject;
};

type NavbarTriggerHiddenProps = {
    contentId: string;
} & NavbarTriggerProps;

const NavbarTrigger: FC<NavbarTriggerProps> = (props) => {
    const { navbarId } = useNavbar();

    const { children, href } = props as NavbarTriggerHiddenProps;

    let timer: NodeJS.Timeout;

    function eventListenerHandler(event: Event) {
        const currentTarget = event.currentTarget as HTMLDivElement;
        if (!currentTarget) return;

        const body = currentTarget.querySelector(
            `#${"navbar-body"}`
        ) as HTMLElement | null;
        const trigger = currentTarget.querySelector(
            `#${"navbar-trigger"}`
        ) as HTMLElement | null;

        const bodyClassList = body?.classList;
        const triggerClassList = trigger?.classList;

        switch (event.type) {
            case "mouseenter":
                timer = setTimeout(() => {
                    bodyClassList?.add(classes["navbar__body--visible"]);
                    triggerClassList?.add(classes["navbar__trigger--visible"]);
                }, 300);
                break;

            default:
                if (bodyClassList?.contains(classes["navbar__body--visible"])) {
                    triggerClassList?.remove(
                        classes["navbar__trigger--visible"]
                    );

                    bodyClassList?.remove(classes["navbar__body--visible"]);
                }
                clearTimeout(timer);
                break;
        }
    }

    useLayoutEffect(() => {
        const cleanupHandler = navbarId.map((id) => {
            const element = document.getElementById(id);
            if (!element) return;

            element.addEventListener("mouseenter", eventListenerHandler);
            element.addEventListener("mouseleave", eventListenerHandler);

            return () => {
                element.removeEventListener("mouseenter", eventListenerHandler);
                element.removeEventListener("mouseleave", eventListenerHandler);
            };
        });

        return () => {
            cleanupHandler.forEach((cleanup) => {
                cleanup && cleanup();
            });
        };
    }, [navbarId]);

    return (
        <LinkCustom
            id='navbar-trigger'
            className={
                false
                    ? `${classes["navbar__trigger"]} ${classes["navbar__trigger--active"]}`
                    : classes["navbar__trigger"]
            }
            href={href}
            styleSettings={{
                color: "DARK",
                size: "X_SMALL",
                type: "TEXT",
                fill: "SOLID",
                icon: { right: "CHEVRON" },
            }}
        >
            {children}
        </LinkCustom>
    );
};

export default NavbarTrigger;
