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
import { ReadonlyURLSearchParams } from "next/navigation";
import classesCustomStyle from "../classesCustomStyle";

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
	styleSettings: StyleSettingsObject;
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

	const classesCustom = classesCustomStyle(styleSettings);

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

	const setQueryParams = `?${urlSearchParams}`;

	return (
		<Link
			id={id}
			ref={linkRef}
			scroll={false}
			href={queryParams ? setQueryParams : `${endpoint}`}
			// href={{
			// 	query: urlSearchParams.size > 0 ? setQueryParams : undefined,
			// 	pathname: endpoint,
			// }}
			className={`${className ?? ""} ${classesCustom} `}
			target={target ? "_blank" : "_self"}
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
