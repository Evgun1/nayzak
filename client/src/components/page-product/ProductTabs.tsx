'use client';

import { FC, ReactNode, useState } from 'react';
import ButtonCustom from '@/lib/ui/custom-elements/button-custom/ButtonCustom';
import classes from './ProductTabs.module.scss';

export interface ProductsTabsItem {
	label: string;
	children: ReactNode;
}

type ProductsTabsProps = { data: ProductsTabsItem[] };

const ProductsTabs: FC<ProductsTabsProps> = ({ data }) => {
	const [tabAction, setTabAction] = useState<number>(0);

	return (
		<div className={classes['tabs']}>
			<div className={classes['tabs__header']}>
				{data.length > 0 &&
					data.map((data, i) => (
						<ButtonCustom
							key={i}
							className={
								tabAction === i ? classes['tabs__header-btn--action'] : ''
							}
							styleSettings={{ color: 'DARK', size: 'MEDIUM', type: 'TEXT' }}
							onClick={() => setTabAction(i)}
						>
							{data.label}
						</ButtonCustom>
					))}
			</div>

			{data[tabAction].children}
		</div>
	);
};

export default ProductsTabs;
