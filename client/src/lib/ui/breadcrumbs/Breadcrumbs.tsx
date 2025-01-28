'use client';

import { useParams, usePathname } from 'next/navigation';

import classes from './Breadcrumbs.module.scss';

import { CSSProperties, useEffect, useState } from 'react';
import { TextClassList } from '@/types/textClassList.enum';
import IconsIdList from '@/components/elements/icons/IconsIdList';
import { ButtonClassList } from '@/types/buttonClassList.enum';
import { ProductItem } from '@/types/product.types';
import { appCategoriesOneGet } from '@/utils/http/categories';
import {
	appSubcategoriesGet,
	appSubcategoriesOneGet,
} from '@/utils/http/subcategories';
import { useRouter } from 'next/router';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import LinkCustom from '../custom-elements/link-custom/LinkCustom';
import getBreadcrumbsData from './getBreadcrumbsData';

export interface BreadcrumbsPathItems {
	path?: string;
	slug?: string;
}

type BreadcrumbsProductProps = {
	product?: ProductItem;
	style?: CSSProperties;
};
const newPath: { path?: string; slug?: string }[] = [];

export default function Breadcrumbs(props: BreadcrumbsProductProps) {
	const pathname = usePathname();
	const slug = useParams().slug;
	const [pathBreadcrumbs, setPathBreadcrumbs] =
		useState<BreadcrumbsPathItems[]>();
	const { style, product } = props;

	const http = window.location.origin;

	useEffect(() => {
		(async () => {
			const breadcrumbsData = await getBreadcrumbsData(pathname, slug);
			setPathBreadcrumbs(breadcrumbsData ?? []);
		})();
	}, [pathname, slug]);

	return (
		<ul className={classes.breadcrumbs} style={style ? style : undefined}>
			{pathBreadcrumbs &&
				pathBreadcrumbs.map((data, index, array) => (
					<li className={classes['breadcrumbs__item']} key={index}>
						{index + 1 !== array.length ? (
							<LinkCustom
								styleSettings={{
									type: 'TEXT',
									color: 'DARK',
									roundness: 'SHARP',
									size: 'X_SMALL',
									icon: { right: 'CHEVRON' },
								}}
								href={{ endpoint: `${http}/${data.path}` }}
								className={`${TextClassList.REGULAR_12} ${classes['breadcrumbs__link']}`}
							>
								{data.slug?.replace(/\b\w/g, (char) => char.toUpperCase())}
							</LinkCustom>
						) : (
							<span
								className={`${
									TextClassList.REGULAR_12 && ButtonClassList.BUTTON_X_SMALL
								} ${classes['breadcrumbs__link']} ${
									classes['breadcrumbs__link--active']
								}`}
							>
								{data.slug?.replace(/\b\w/g, (char) => char.toUpperCase())}
							</span>
						)}
					</li>
				))}
		</ul>
	);
}
