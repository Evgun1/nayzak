"use client";

import React, { FC, ReactNode } from "react";
import classes from "./DropDown.module.scss";
import LinkCustom, {
    HrefObject,
} from "../custom-elements/link-custom/LinkCustom";
import ButtonCustom from "../custom-elements/button-custom/ButtonCustom";

interface DropDownItemProps {
    elementType: "button" | "link";
    children: ReactNode;
    href?: HrefObject;
    className?: string;
    onClick?: () => void;
}

type DropDownButtonProps = {
    className?: string;
    children: ReactNode;
    elementType: "button";
    onClick?: () => void;
};

type DropDownLinkProps = {
    className?: string;
    children: ReactNode;
    elementType: "link";
    href: HrefObject;
};

const DropDownItem: ((props: DropDownButtonProps) => JSX.Element) &
    ((props: DropDownLinkProps) => JSX.Element) = (
    props: DropDownItemProps
) => {
    const { href, elementType: elementType, children } = props;

    if (elementType === "button") {
        return (
            <ButtonCustom
                className={classes["drop-down__item"]}
                styleSettings={{
                    color: "LIGHT",
                    type: "DEFAULT",
                    size: "MEDIUM",
                    fill: "SOLID",
                }}
            >
                {children}
            </ButtonCustom>
        );
    }

    return (
        <LinkCustom
            className={classes["drop-down__item"]}
            href={href as HrefObject}
            styleSettings={{
                color: "LIGHT",
                type: "DEFAULT",
                size: "MEDIUM",
                fill: "SOLID",
            }}
        >
            {children}
        </LinkCustom>

        // <div
        //     className={`${className ? className : ""} ${
        //         classes["drop-down__item"]
        //     }`}
        // >
        //     {children}
        // </div>
    );
};

export default DropDownItem;
