import Link from "next/link";
import { FC, ReactNode, RefObject } from "react";

import "../style.scss";
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
    styleSettings?: StyleSettingsObject;
    className?: string;
    children?: ReactNode;
    target?: boolean;
    searchParams?: URLSearchParams | ReadonlyURLSearchParams;
    linkRef?: RefObject<HTMLAnchorElement>;
    href: HrefObject;
    onClick?: () => void;
};

const LinkCustom: FC<LinkCustomProps> = ({
    styleSettings,
    className,
    href: { queryParams, deleteQueryParams, endpoint },
    linkRef,
    children,
    target,
    onClick,
    searchParams,
    id,
}) => {
    const urlSearchParams = new URLSearchParams(searchParams?.toString());

    let linkColor;
    if (styleSettings?.type === "DEFAULT" || styleSettings?.type === "SQUARE") {
        styleSettings?.color === "DARK"
            ? (linkColor = Color.DARK_DEFAULT)
            : (linkColor = Color.LIGHT_DEFAULT);
    }

    if (styleSettings?.type === "TEXT") {
        styleSettings?.color === "DARK"
            ? (linkColor = Color.DARK_TEXT)
            : (linkColor = Color.LIGHT_TEXT);
    }

    if (styleSettings?.type === "UNDERLINE") {
        styleSettings?.color === "DARK"
            ? (linkColor = Color.DARK_UNDERLINE)
            : (linkColor = Color.LIGHT_UNDERLINE);
    }

    const classes: any[] = [
        linkColor,
        styleSettings && styleSettings.size && Size[styleSettings.size],
        styleSettings &&
            styleSettings.roundness &&
            Roundness[styleSettings.roundness],
        styleSettings && styleSettings.type && Type[styleSettings.type],
        styleSettings && styleSettings.fill && Fill[styleSettings.fill],
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
            {styleSettings?.icon?.left ? (
                <DisplayIcon iconName={IconsIdList[styleSettings.icon.left]} />
            ) : (
                ""
            )}
            {children ?? ""}
            {styleSettings?.icon?.right ? (
                <DisplayIcon iconName={IconsIdList[styleSettings.icon.right]} />
            ) : (
                ""
            )}
        </Link>
    );
};

export default LinkCustom;
