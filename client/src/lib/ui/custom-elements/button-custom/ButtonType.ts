import { ReactNode, RefObject } from 'react';
import IconsIdList from '../../../../components/elements/icons/IconsIdList';
import classes from './ButtonCustom.module.scss';

export enum Color {
	dark_default = 'color-default--dark',
	light_default = 'color-default--light',
	dark_text = 'color-text--dark',
	light_text = 'color-text--light',
	dark_underline = 'color-underline--dark',
	light_underline = 'color-underline--light',
}

export enum Size {
	X_LARGE = 'btn-size--xl button-xlarge',
	LARGE = 'btn-size--l button-large',
	MEDIUM = 'btn-size--m button-medium',
	SMALL = 'btn-size--s button-small',
	X_SMALL = 'btn-size--xs button-xsmall',
}

export enum Roundness {
	PILL = 'btn-roundness--pill',
	ROUNDED = 'btn-roundness--rounded',
	SHARP = 'btn-roundness--sharp',
}

export enum Type {
	DEFAULT = 'btn-type--default',
	CIRCLE = 'btn-type--circle',
	text = 'btn-type--text',
	underline = 'btn-type--underline',
}

export interface IconInterface {
	icon_left?: IconsIdList;
	icon_right?: IconsIdList;
}
