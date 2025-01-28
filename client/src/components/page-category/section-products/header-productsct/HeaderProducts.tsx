import { FC } from 'react';
import classes from './HeaderProducts.module.scss';
import { headers } from 'next/headers';
import Breadcrumbs, {
	BreadcrumbsPathItems,
} from '@/lib/ui/breadcrumbs/Breadcrumbs';

type HeaderProps = {
	slug: string[];
};

const HeaderProducts: FC<HeaderProps> = ({ slug }) => {
	const header = headers();

	const title =
		String(slug.slice(-1).pop()).charAt(0).toUpperCase() +
		String(slug.slice(-1).pop()).slice(1);

	return (
		<div className={`container ${classes.header}`}>
			<div className={classes.header__block}>
				<Breadcrumbs />
				{/* <Breadcrumbs /> */}
				<h3>{title}</h3>
			</div>
		</div>
	);
};

export default HeaderProducts;
