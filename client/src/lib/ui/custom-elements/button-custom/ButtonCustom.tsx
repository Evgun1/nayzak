import { FC, MouseEventHandler, ReactNode, RefObject } from 'react';

import DisplayIcon from '../../../../components/elements/icons/displayIcon';

import '../style.scss';
import IconsIdList from '../../../../components/elements/icons/IconsIdList';
import { Color, Fill, Roundness, Size, Type } from '../ActionElements.types';

export interface StyleSettingsObject {
	size: keyof typeof Size;
	roundness?: keyof typeof Roundness;
	fill?: keyof typeof Fill;
	type: keyof typeof Type;
	color: 'DARK' | 'LIGHT';
	icon?: {
		left?: keyof typeof IconsIdList;
		right?: keyof typeof IconsIdList;
	};
}

interface TypeObject {
	button: 'button';
	reset: 'reset';
	submit: 'submit';
}

type SiteButtonProps = {
	styleSettings: StyleSettingsObject;
	className?: string | null;
	btnRef?: RefObject<HTMLButtonElement>;
	id?: string;
	children?: ReactNode;
	typeProperty?: keyof TypeObject;
	onClick?: () => void;
	onSubmit?: () => void;
};

export const ButtonCustom: FC<SiteButtonProps> = ({
	styleSettings: { color, roundness, size, type, icon, fill },
	className,
	children,
	btnRef,
	id,
	typeProperty,
	onClick,
	onSubmit,
}) => {
	let btnColor;

	if (type === 'DEFAULT' || type === 'SQUARE') {
		color === 'DARK'
			? (btnColor = Color.DARK_DEFAULT)
			: (btnColor = Color.LIGHT_DEFAULT);
	}

	if (type === 'TEXT') {
		color === 'DARK'
			? (btnColor = Color.DARK_TEXT)
			: (btnColor = Color.LIGHT_TEXT);
	}

	if (type === 'UNDERLINE') {
		color === 'DARK'
			? (btnColor = Color.DARK_UNDERLINE)
			: (btnColor = Color.LIGHT_UNDERLINE);
	}

	const classes: any[] = [
		btnColor,
		Size[size],
		roundness && Roundness[roundness],
		Type[type],
		fill && Fill[fill],
	];

	return (
		<button
			id={id}
			ref={btnRef}
			onSubmit={onSubmit}
			onClick={onClick}
			className={`${className ?? ''} ${classes.join(' ')}`}
			type={typeProperty ?? 'button'}
		>
			{icon?.left ? <DisplayIcon iconName={IconsIdList[icon.left]} /> : ''}
			{children ?? ''}
			{icon?.right ? <DisplayIcon iconName={IconsIdList[icon.right]} /> : ''}
		</button>
	);
};

export default ButtonCustom;
