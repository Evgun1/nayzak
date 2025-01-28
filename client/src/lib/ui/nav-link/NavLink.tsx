'use client';

import classes from './NavLink.module.scss';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import LinkCustom, {
	StyleSettingsObject,
} from '../custom-elements/link-custom/LinkCustom';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';

interface HrefObject {
	endpoint?: string;
	queryParams?: { [key: string]: string };
}

type NavLinkProps = {
	href: HrefObject;
	classesName?: string;
	children: ReactNode;
	customStyleActive?: string;
	styleSettings: StyleSettingsObject;
};

export default function NavLink({
	children,
	href,
	styleSettings,
	classesName,
	customStyleActive,
}: NavLinkProps) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const urlSearchParams = new URLSearchParams(searchParams.toString());

	const { endpoint, queryParams } = href;

	let active: boolean = false;

	const getDataBreadcrumbs = (() => {
		const breadcrumbsRecursionHandler = (children: ReactNode) => {
			return React.Children.map(children, (child): ReactNode => {
				if (React.isValidElement(child)) {
					if (typeof child.props.children === 'string') {
						return child.props.children;
					} else {
						const childWithChildren = child as ReactElement<{
							children: ReactNode;
						}>;

						return breadcrumbsRecursionHandler(
							childWithChildren.props.children
						);
					}
				}
			});
		};
		return breadcrumbsRecursionHandler(Breadcrumbs({})) as string[];
	})();

	if (queryParams) {
		for (const key in queryParams) {
			urlSearchParams.set(key, queryParams[key].toLowerCase());
		}

		// active =
		// 	searchParams.get('category') === children?.toString().toLocaleLowerCase();
	}

	if (endpoint) {
		const findString = getDataBreadcrumbs
			.slice(1)
			.find((data) => data.toLowerCase() === endpoint.split('/')[1]);

		if (findString) {
			active = true;
		}
	}

	const setQueryParams = `?${urlSearchParams}`;

	return (
		<LinkCustom
			className={`${classesName} ${
				active
					? (customStyleActive ?? classes.action) || classes.link
					: classes.link
			}`}
			styleSettings={styleSettings}
			href={
				queryParams
					? { queryParams: { setQueryParams } }
					: { endpoint: `/${endpoint}` }
			}
		>
			{children}
		</LinkCustom>
	);
}
