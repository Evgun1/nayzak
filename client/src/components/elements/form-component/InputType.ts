import {
	ChangeEventHandler,
	HTMLInputTypeAttribute,
	TextareaHTMLAttributes,
} from 'react';
import IconsIdList from '../icons/IconsIdList';

interface ButtonItem {
	icon?: IconsIdList;
	text?: string;
	onClick?: () => void;
	type: 'reset' | 'submit' | 'button';
}

interface ButtonObject {
	left?: ButtonItem;
	right?: ButtonItem;
}

type TypeAttribute =
	| 'email'
	| 'password'
	| 'text'
	| 'number'
	| 'image'
	| 'file'
	| 'hidden';

export interface InputSettingsItem {
	id: string;
	name: string;
	placeholder?: string;
	type: TypeAttribute;
	required?: boolean;
	autoComplete?: string;
	defaultValue?: string | number | readonly string[];
	disabled?: boolean;
	maxLength?: number;
}

export type InputType = {
	inputSettings: InputSettingsItem;
	error?: string[];
};
