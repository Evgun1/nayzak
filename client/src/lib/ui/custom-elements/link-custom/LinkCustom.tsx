import Link from "next/link";
import { FC, ReactNode, RefObject } from "react";

import "../style.scss";
import { Url } from "url";
import { Color, Fill, Roundness, Size, Type } from "../ActionElements.types";
import IconsIdList from "@/components/elements/icons/IconsIdList";
import DisplayIcon from "@/components/elements/icons/displayIcon";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

export interface HrefObject {
    endpoint?: string;
    queryParams?: { [key: string]: string };
    deleteQueryParams?: string;
}
export interface StyleSettingsObject {
    size: keyof typeof Size;
    roundness?: keyof typeof Roundness;
    type: keyof typeof Type;
    color: "DARK" | "LIGHT";
    fill?: keyof typeof Fill;
    icon?: {
        left?: keyof typeof IconsIdList;
        right?: keyof typeof IconsIdList;
    };
}

export type LinkCustomProps = {
    id?: string;
    styleSettings: StyleSettingsObject;
    className?: string;
    children?: ReactNode;
    target?: boolean;
    searchParams?: URLSearchParams | ReadonlyURLSearchParams;
    linkRef?: RefObject<HTMLAnchorElement>;
    href: HrefObject;
    onClick?: () => void;
};

const LinkCustom: FC<LinkCustomProps> = ({
    styleSettings: { color, icon, roundness, size, type, fill },
    className,
    searchParams,
    href: { queryParams, deleteQueryParams, endpoint },
    linkRef,
    children,
    target,
    onClick,
    id,
}) => {
    const urlSearchParams = new URLSearchParams(searchParams?.toString());

    let linkColor;
    if (type === "DEFAULT" || type === "SQUARE") {
        color === "DARK"
            ? (linkColor = Color.DARK_DEFAULT)
            : (linkColor = Color.LIGHT_DEFAULT);
    }

    if (type === "TEXT") {
        color === "DARK"
            ? (linkColor = Color.DARK_TEXT)
            : (linkColor = Color.LIGHT_TEXT);
    }

    if (type === "UNDERLINE") {
        color === "DARK"
            ? (linkColor = Color.DARK_UNDERLINE)
            : (linkColor = Color.LIGHT_UNDERLINE);
    }

    const classes: any[] = [
        linkColor,
        Size[size],
        roundness && Roundness[roundness],
        Type[type],
        fill && Fill[fill],
    ];

    if (queryParams) {
        for (const urlNameKey in queryParams) {
            urlSearchParams.set(
                urlNameKey,
                queryParams[urlNameKey].toLowerCase()
            );
        }
    }
    if (deleteQueryParams) urlSearchParams.delete(deleteQueryParams);

    const setQueryParams = `?${urlSearchParams}`;

    return (
        <Link
            id={id}
            ref={linkRef}
            scroll={false}
            href={queryParams ? setQueryParams : `${endpoint}`}
            className={`${className ?? ""} ${classes.join(" ")} `}
            target={target ? "_blank" : "_self"}
            // style={{ pointerEvents: true ? "none" : "auto" }}
            onClick={onClick}
        >
            {icon?.left ? (
                <DisplayIcon iconName={IconsIdList[icon.left]} />
            ) : (
                ""
            )}
            {children ?? ""}
            {icon?.right ? (
                <DisplayIcon iconName={IconsIdList[icon.right]} />
            ) : (
                ""
            )}
        </Link>
    );
};

export default LinkCustom;
