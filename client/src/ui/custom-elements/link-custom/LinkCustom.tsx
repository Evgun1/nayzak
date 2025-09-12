import Link from "next/link";
import { FC, MouseEvent, ReactNode, RefObject } from "react";

import "../style.scss";
import {
	Color,
	Fill,
	Roundness,
	Size,
	State,
	Type,
} from "../ActionElements.types";
import IconsIdList from "@/components/icons/IconsIdList";
import DisplayIcon from "@/components/icons/displayIcon";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

export interface HrefObject {
	endpoint?: string;
	queryParams?: { [key: string]: any };
	deleteQueryParams?: string | { [key: string]: any };
}
export interface StyleSettingsObject {
	size: keyof typeof Size;
	roundness?: keyof typeof Roundness;
	type: keyof typeof Type;
	color: "DARK" | "LIGHT";
	fill?: keyof typeof Fill;
	state?: Array<keyof typeof State>;
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
	searchParams?: URLSearchParams | ReadonlyURLSearchParams | null;
	linkRef?: RefObject<HTMLAnchorElement>;
	href: HrefObject;
	// href: HrefObject;
	onClick?: (e: MouseEvent) => void;
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
			urlSearchParams.set(urlNameKey, queryParams[urlNameKey]);
		}
	}
	if (deleteQueryParams) {
		if (typeof deleteQueryParams === "string") {
			urlSearchParams.delete(deleteQueryParams);
		} else if (typeof deleteQueryParams === "object") {
			for (const key in deleteQueryParams) {
				urlSearchParams.delete(key, deleteQueryParams[key]);
			}
		}
	}
	if (styleSettings?.state && styleSettings?.state.length > 0)
		for (const element of styleSettings.state) classes.push(State[element]);

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
