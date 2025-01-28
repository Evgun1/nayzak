'use client';

import { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import classes from './DropDown.module.scss';
interface DropDownItemProps extends ComponentPropsWithoutRef<'div'> {
	children: ReactNode;
	active?: boolean;
}

const DropDownItem: FC<DropDownItemProps> = ({ children, active = true }) => {
	return (
		<div
			onClick={(e) => {
				const target = e.currentTarget as Element;
			}}
			className={`${classes['drop-down--item']} ${
				!active ? classes.disable : ''
			}`}
		>
			{children}
		</div>
	);
};

export default DropDownItem;
