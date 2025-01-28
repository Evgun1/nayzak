'use client';

import { FC, useEffect, useState } from 'react';

import classes from './Subcategories.module.scss';
import { usePathname } from 'next/navigation';
import { SubcategoryItem } from '@/types/subcategories.types';
import { appSubcategoryByCategoryGet } from '@/utils/http/subcategories';
import LinkCustom from '@/lib/ui/custom-elements/link-custom/LinkCustom';

type SubcategoriesGridProps = {
	slug: string;
};

const SubcategoriesItem: FC<SubcategoriesGridProps> = ({ slug }) => {
	const pathname = usePathname();
	const [subcategories, setSubcategories] = useState<SubcategoryItem[]>();

	useEffect(() => {
		(async () => {
			const currentSubcategories = await appSubcategoryByCategoryGet(slug);

			setSubcategories(currentSubcategories);
		})();
	}, [slug]);

	return (
		<div className={`container ${classes.subcategories}`}>
			{subcategories &&
				subcategories.length > 0 &&
				subcategories.map(({ title }, index) => (
					<div key={index} className={classes['subcategories--item']}>
						<LinkCustom
							styleSettings={{
								color: 'DARK',
								roundness: 'ROUNDED',
								size: 'MEDIUM',
								type: 'DEFAULT',
							}}
							href={{
								endpoint: `${pathname}/${title.toLowerCase()}`,
							}}
							className={classes['subcategories--item-btn']}
						>
							{title}
						</LinkCustom>
					</div>
				))}
		</div>
	);
};

export default SubcategoriesItem;
