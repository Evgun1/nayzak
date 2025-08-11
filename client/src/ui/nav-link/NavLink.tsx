"use client";

import classes from "./NavLink.module.scss";

import { usePathname, useSearchParams } from "next/navigation";
import React, { ReactElement, ReactNode } from "react";
import LinkCustom, {
	HrefObject,
	StyleSettingsObject,
} from "../custom-elements/link-custom/LinkCustom";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { log } from "console";

// interface HrefObject {
//     endpoint?: string;
//     queryParams?: { [key: string]: string };
// }

type NavLinkProps = {
	href: HrefObject;
	classesName?: string;
	id?: string;
	children: ReactNode;
	searchParams?: URLSearchParams;
	customStyleActive?: string;
	styleSettings: StyleSettingsObject;
};

export default function NavLink({
	children,
	href,
	styleSettings,
	classesName,
	searchParams,
	customStyleActive,
	id,
}: NavLinkProps) {
	const pathname = usePathname();
	const urlSearchParams = new URLSearchParams(searchParams?.toString());

	const { endpoint, queryParams } = href;

	let active: boolean = false;

	const getDataBreadcrumbs = (() => {
		const breadcrumbsRecursionHandler = (children: ReactNode) => {
			return React.Children.map(children, (child): ReactNode => {
				if (React.isValidElement(child)) {
					if (typeof child.props.children === "string") {
						return child.props.children;
					} else {
						const childWithChildren = child as ReactElement<{
							children: ReactNode;
						}>;

						return breadcrumbsRecursionHandler(
							childWithChildren.props.children,
						);
					}
				}
			});
		};
		// return breadcrumbsRecursionHandler(Breadcrumbs({})) as string[];
	})();

	if (queryParams) {
		for (const key in queryParams) {
			urlSearchParams.set(key, queryParams[key]);
		}

		console.log(searchParams?.toString());

		// active =
		// 	searchParams.get('category') === children?.toString().toLocaleLowerCase();
	}

	if (endpoint) {
		// const findString = getDataBreadcrumbs
		// 	.slice(1)
		// 	.find((data) => data.toLowerCase() === endpoint.split("/")[1]);
		// if (findString) {
		// 	active = true;
		// }
	}

	return (
		<LinkCustom
			id={id}
			className={`${classesName ? classesName : ""} ${
				active
					? (customStyleActive ?? classes.action) || classes.link
					: classes.link
			}`}
			styleSettings={styleSettings}
			href={
				queryParams
					? { queryParams: queryParams }
					: { endpoint: `/${endpoint}` }
			}
		>
			{children}
		</LinkCustom>
	);
}
