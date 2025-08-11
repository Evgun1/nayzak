import { FC } from 'react';
import IconsIdList from './IconsIdList';

import './style.scss';

type DisplayIconProps = {
	iconName: IconsIdList;
	className?: string;
	name?: string;
};

const DisplayIcon = ({ iconName, className, name }: DisplayIconProps) => {
	return (
		<svg className={className} name={name}>
			<use width={'100%'} height={'100%'} xlinkHref={`#${iconName}`} />
		</svg>
	);
};

export default DisplayIcon;
