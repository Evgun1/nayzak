import { ButtonClassList } from '@/types/buttonClassList.enum';
import { TextClassList } from '@/types/textClassList.enum';

import classes from './Colums.module.scss';
import { FC } from 'react';
import LinkCustom from '@/lib/ui/custom-elements/link-custom/LinkCustom';

const COLUM_DATA = [
	{
		title: 'Shop',
		item: [
			{ title: 'My account' },
			{ title: 'Login' },
			{ title: 'Wishlist' },
			{ title: 'Cart' },
		],
	},
	{
		title: 'Information',
		item: [
			{ title: 'Shipping Policy' },
			{ title: 'Returns & Refunds' },
			{ title: 'Cookies Policy' },
			{ title: 'Frequently asked' },
		],
	},
	{
		title: 'Company',
		item: [
			{ title: 'About us' },
			{ title: 'Privacy Policy' },
			{ title: 'Terms & Conditions' },
			{ title: 'Contact Us' },
		],
	},
];

const Colums: FC = async () => {
	return (
		<div className={classes['colums']}>
			{COLUM_DATA &&
				COLUM_DATA.length &&
				COLUM_DATA.map((data, index) => (
					<div key={index}>
						<div
							className={`${classes[`colums--title`]} ${
								ButtonClassList.BUTTON_X_SMALL
							}  `}
						>
							{data.title}
						</div>
						<ul className={classes[`colums--list`]}>
							{data.item &&
								data.item.length &&
								data.item.map((itemData, index) => (
									<li key={index}>
										<LinkCustom
											href={{ endpoint: '#' }}
											styleSettings={{
												roundness: 'SHARP',
												type: 'TEXT',
												color: 'DARK',
												size: 'X_SMALL',
											}}
											className={`${classes[`colums--list-link`]} ${
												TextClassList.REGULAR_14
											}`}
										>
											{itemData.title}
										</LinkCustom>
									</li>
								))}
						</ul>
					</div>
				))}
		</div>
	);
};

export default Colums;
