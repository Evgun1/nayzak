import DisplayIcon from '@/components/elements/icons/displayIcon';
import IconsIdList from '@/components/elements/icons/IconsIdList';

import classes from './Header.module.scss';
import Actions from './Actions';

import Navigation from './Navigation';
import Link from 'next/link';

const Header = () => {
	return (
		<header className={`container ${classes.navigation}`}>
			<Link href={'/'} className={classes['navigation--logo']}>
				<DisplayIcon
					className={classes['navigation--logo-icon']}
					iconName={IconsIdList.LOGOTYPE}
				/>
			</Link>
			<Navigation />
			<Actions />
		</header>
	);
};

export default Header;
