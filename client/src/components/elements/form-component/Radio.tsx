import classes from './Radio.module.scss';

import React, {
	ChangeEvent,
	FC,
	ReactNode,
	RefObject,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Roundness, Size } from './Radio.types';

interface RadioSettingsItem {
	id: number;
	name: string;
	defaultChecked?: number;
}

interface RadioStyleItem {
	size: keyof typeof Size;
	roundness: keyof typeof Roundness;
}

type RadioProps = {
	radioSettings: RadioSettingsItem;
	radioStyle: RadioStyleItem;
	children?: ReactNode;
	value?: string;
};

const Radio: FC<RadioProps> = (props) => {
	const { radioSettings, radioStyle, children, value } = props;
	const [checked, setChecked] = useState<boolean>(false);
	const [defaultChecked, setDefaultChecked] = useState<boolean>(true);

	useEffect(() => {
		if (value) {
			setChecked(radioSettings.id.toString() === value);
		} else {
			setChecked(
				radioSettings.id.toString() === radioSettings.defaultChecked?.toString()
			);
		}
	}, [value]);

	const ref = useRef() as RefObject<HTMLInputElement>;

	return (
		<div className={classes.radio}>
			<input
				ref={ref}
				checked={checked}
				readOnly
				type="radio"
				name={radioSettings.name}
				id={radioSettings.id.toString()}
				className={`${classes['radio__input']} ${
					classes[Size[radioStyle.size]]
				} ${classes[Roundness[radioStyle.roundness]]}`}
			/>
			{children ?? <></>}
		</div>
	);
};

export default Radio;
